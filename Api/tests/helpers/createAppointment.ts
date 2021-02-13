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
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      timestamp: date,
    },
  });
};
