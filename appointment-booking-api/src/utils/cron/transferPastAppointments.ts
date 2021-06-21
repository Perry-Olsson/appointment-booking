import { prisma } from "../../prisma";

export const transferPastAppointments = async () => {
  const now = new Date();
  const pastAppointmentCondition = { timestamp: { lt: now } };

  const pastAppointments = await prisma.appointment.findMany({
    where: pastAppointmentCondition,
  });

  await prisma.appointment.deleteMany({ where: pastAppointmentCondition });
  console.log(pastAppointments);
};
