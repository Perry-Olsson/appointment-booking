import { Appointment } from "@prisma/client";
import { ONE_MONTH } from "../../../../src/constants";
import { prisma } from "../../../../src/prisma";
import { createNewAppointment } from "../../../../src/prisma/seeds/utils";

export const createAppointmentsOneYearApart = async (): Promise<AppointmentsInfo> => {
  const elevenMonthsFromNow = Date.now() + 11 * ONE_MONTH;
  const lastMonth = Date.now() - ONE_MONTH;
  const { id: id1, timestamp } = await createAppointment(elevenMonthsFromNow, {
    hour: 12,
    minute: 0,
  });
  const { id: id2 } = await createAppointment(lastMonth, {
    hour: 12,
    minute: 0,
  });

  return {
    id1,
    id2,
    year: timestamp.getFullYear(),
    month: timestamp.getMonth(),
  };
};

export const deleteAppointmentsOneYearApart = async ({
  id1,
  id2,
}: Pick<AppointmentsInfo, "id1" | "id2">) => {
  await prisma.appointment.deleteMany({
    where: { OR: [{ id: id1 }, { id: id2 }] },
  });
};

export const createAppointment = async (
  utc: number,
  { hour, minute }: Time
): Promise<Appointment> => {
  const date = new Date(utc);
  date.setHours(hour);
  date.setMinutes(minute);

  return await prisma.appointment.create({
    data: createNewAppointment(date),
  });
};

export interface Time {
  hour: number;
  minute: number;
}

interface AppointmentsInfo {
  id1: number;
  id2: number;
  month: number;
  year: number;
}
