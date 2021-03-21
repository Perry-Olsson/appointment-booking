import { Appointment } from "@prisma/client";
import { prisma } from "../../src/prisma";
import { createNewAppointment } from "../../src/prisma/seeds/utils";
import { NewAppointment, Time } from "../../src/types";

export const createTestAppointment = async ({
  time = {},
  pushToDb = false,
}: TestAppointmentOptions = {}): Promise<TestAppointment> => {
  const { timestamp, end } = createAppointmentTimestamps(time);
  const data = createNewAppointment(timestamp, end);

  const appointment = pushToDb
    ? await prisma.appointment.create({
        data,
      })
    : null;

  return { data, appointment };
};

export const createAppointmentTimestamps = ({
  start = {},
  finish = {},
}: TestAppointmentTime): AppointmentTimestamps => {
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
  const end = new Date(time.year, time.month, time.day, time.hour, time.minute);

  return { timestamp, end };
};

export const createDefaultTime = (): Required<Time> => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: 15,
    hour: 10,
    minute: 30,
  };
};

interface TestAppointment {
  data: NewAppointment;
  appointment: Appointment | null;
}

interface TestAppointmentOptions {
  time?: TestAppointmentTime;
  pushToDb?: boolean;
}

interface TestAppointmentTime {
  start?: Time;
  finish?: Time;
}

interface AppointmentTimestamps {
  timestamp: Date;
  end: Date;
}
