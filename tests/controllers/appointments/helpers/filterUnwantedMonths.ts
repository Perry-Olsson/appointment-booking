import { Appointment } from "@prisma/client";

export const filterUnwantedMonths = (
  appointments: Appointment[],
  currentMonth: number,
  currentYear: number
) => {
  return appointments.filter(
    a =>
      a.timestamp.getMonth() === currentMonth &&
      a.timestamp.getFullYear() === currentYear
  );
};
