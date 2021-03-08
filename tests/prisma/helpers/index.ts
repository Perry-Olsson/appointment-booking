import { Appointment } from "@prisma/client";

export const getDaysBetweenAppointments = (appointments: Appointment[]) => {
  const daysBetweenAppointments = [];
  for (let i = 1; i < appointments.length; i++) {
    daysBetweenAppointments.push(
      appointments[i].timestamp.getDate() -
        appointments[i - 1].timestamp.getDate()
    );
  }
  return daysBetweenAppointments;
};
