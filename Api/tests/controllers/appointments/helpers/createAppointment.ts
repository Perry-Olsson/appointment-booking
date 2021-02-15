import { Appointment } from "@prisma/client";
import { prisma } from "../../../../src/prisma";
import { createNewAppointment } from "../../../../src/prisma/seeds/utils";

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
