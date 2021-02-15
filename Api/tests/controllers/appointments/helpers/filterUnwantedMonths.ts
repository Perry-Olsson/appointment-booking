import { Appointment } from "@prisma/client";

export const filterUnwantedMonths = (
  appointments: Appointment[],
  currentMonth: number,
  currentYear: number
) => {
  return appointments.filter(
    app => app.month === currentMonth && app.year === currentYear
  );
};
