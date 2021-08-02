import { Appointment } from "@prisma/client";
import { ONE_MONTH } from "../../src/constants";
import { prisma } from "../../src/prisma";
import {
  createNewAppointment,
  randomizeAppointmentType,
} from "../../src/prisma/seeds/utils";
import { NewAppointment, Time } from "../../src/types";
import { HOUR } from "../../src/constants";

export const createTestAppointment = async ({
  time = { start: {} },
  pushToDb = false,
  customerId = "john@example.com",
  defaultProvider,
}: TestAppointmentOptions = {}): Promise<TestAppointment> => {
  const { timestamp, end } = createAppointmentTimestamps(time);

  const data = createNewAppointment({
    ...randomizeAppointmentType(defaultProvider),
    customerId,
    timestamp,
    end,
  });

  const appointment = pushToDb
    ? await prisma.appointment.create({
        data,
      })
    : null;

  return { data, appointment };
};

export const createAppointmentTimestamps = (
  appointmentTime: TestAppointmentTime | Date
): AppointmentTimestamps => {
  if (appointmentTime instanceof Date) {
    return {
      timestamp: appointmentTime,
      end: new Date(appointmentTime.valueOf() + HOUR),
    };
  } else {
    const { start, finish } = appointmentTime;
    const { year, month, day, minute, hour } = createDefaultTime();

    const time = {
      year: start.year || year,
      month: start.month || month,
      day: start.day || day,
      hour: start.hour || hour,
      minute: start.minute || minute,
    };

    const timestamp = new Date(
      time.year,
      time.month,
      time.day,
      time.hour,
      time.minute
    );
    time.hour = time.hour + 1;
    for (let field in finish) {
      time[field as keyof Time] = finish[field as keyof Time] as number;
    }
    const end = new Date(
      time.year,
      time.month,
      time.day,
      time.hour,
      time.minute
    );

    return { timestamp, end };
  }
};

export const createDefaultTime = (): Required<Time> => {
  const fiveMonthsFromNow = new Date(Date.now() + ONE_MONTH * 5);

  return {
    year: fiveMonthsFromNow.getFullYear(),
    month: fiveMonthsFromNow.getMonth(),
    day: 15,
    hour: 17,
    minute: 30,
  };
};

export const createTwoPastAppointments = async () => {
  const pastAppointmentTimestamp = new Date();
  pastAppointmentTimestamp.setUTCDate(
    pastAppointmentTimestamp.getUTCDate() - 2
  );

  const pastAppointmentOne = await createTestAppointment({
    time: pastAppointmentTimestamp,
    pushToDb: true,
  });

  const anotherPastAppointment = new Date(pastAppointmentTimestamp);
  anotherPastAppointment.setUTCDate(anotherPastAppointment.getUTCDate() - 1);

  const pastAppointmentTwo = await createTestAppointment({
    time: anotherPastAppointment,
    pushToDb: true,
    customerId: "angela.newman@example.com",
  });

  return [pastAppointmentOne, pastAppointmentTwo];
};

interface TestAppointment {
  data: NewAppointment;
  appointment: Appointment | null;
}

interface TestAppointmentOptions {
  time?: TestAppointmentTime | Date;
  pushToDb?: boolean;
  defaultProvider?: boolean;
  customerId?: string;
}

interface TestAppointmentTime {
  start: Time;
  finish?: Time;
}

interface AppointmentTimestamps {
  timestamp: Date;
  end: Date;
}
