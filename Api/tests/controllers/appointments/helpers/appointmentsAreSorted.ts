import { Appointment } from "@prisma/client";

export const appointmentsAreSorted = (appointments: Appointment[]) => {
  let lastAppointment = -Infinity;
  for (let appointment of appointments) {
    if (appointment.timestamp.getTime() < lastAppointment) return false;

    lastAppointment = appointment.timestamp.getTime();
  }
  return true;
};
