import { Appointment } from "@prisma/client";
import { prisma } from "../../src/prisma";
import { createNewAppointment } from "../../src/prisma/seeds/utils";
import { NewAppointment, Time } from "../../src/types";

export const createTestAppointment = async ({
  time,
  pushToDb,
}: TestAppointmentOptions = {}): Promise<TestAppointment> => {
  const data = createNewAppointment(createAppointmentTimestamp(time));
  const appointment =
    pushToDb === true
      ? await prisma.appointment.create({
          data,
        })
      : null;

  return { data, appointment };
};

export const createAppointmentTimestamp = (time: Time = {}): Date => {
  const now = new Date();

  const year = time.year || now.getFullYear();
  const month = time.month || now.getMonth() + 1;
  const day = time.day || 15;
  const hour = time.hour || 10;
  const minute = time.minute || 30;

  return new Date(year, month, day, hour, minute);
};

interface TestAppointmentOptions {
  time?: Time;
  pushToDb?: boolean;
}

interface TestAppointment {
  data: NewAppointment;
  appointment: Appointment | null;
}
