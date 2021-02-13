import { Appointment } from "@prisma/client";
import { prisma } from "../../src/prisma";
import { Time } from "../../src/types";

export const createAppointment = async (
  utc: number,
  { hour, minute }: Time
): Promise<Appointment> => {
  const date = new Date(utc);
  date.setHours(hour);
  date.setMinutes(minute);

  return await prisma.appointment.create({
    data: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      timestamp: date,
    },
  });
};
