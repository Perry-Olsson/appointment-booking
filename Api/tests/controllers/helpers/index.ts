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
      returnApp[field] = appointment[field];
    }
  }
  return returnApp as Appointment;
};

export const appointmentsAreSorted = (appointments: any) => {
  let lastAppointment = -Infinity;
  for (let appointment of appointments) {
    if (appointment.timestamp < lastAppointment) return false;

    lastAppointment = appointment.timestamp;
  }
  return true;
};
