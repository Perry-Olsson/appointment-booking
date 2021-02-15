import { Appointment } from "@prisma/client";

export const parseRawAppointment = (appointment: any): Appointment => {
  const returnApp: any = {};
  for (let field in appointment) {
    if (
      field === "createdAt" ||
      field === "updatedAt" ||
      field === "timestamp"
    ) {
      returnApp[field] = new Date(appointment[field]);
    } else {
      if (
        field === "id" ||
        field === "year" ||
        field === "month" ||
        field === "day" ||
        field === "hour" ||
        field === "minute"
      )
        returnApp[field] = appointment[field];
      else throw new Error("Invalid appointment fields");
    }
  }
  if (Object.keys(returnApp).length !== 9)
    throw new Error("Missing fields in appointment");
  return returnApp as Appointment;
};

export const appointmentsAreSorted = (appointments: Appointment[]) => {
  let lastAppointment = -Infinity;
  for (let appointment of appointments) {
    if (appointment.timestamp.getTime() < lastAppointment) return false;

    lastAppointment = appointment.timestamp.getTime();
  }
  return true;
};

export const filterUnwantedMonths = (
  appointments: Appointment[],
  currentMonth: number,
  currentYear: number
) => {
  return appointments.filter(
    app => app.month === currentMonth && app.year === currentYear
  );
};
