import { prisma } from "../../prisma";

export const transferPastAppointments = async () => {
  try {
    const now = new Date();
    const pastAppointmentCondition = { timestamp: { lt: now } };

    const pastAppointments = await prisma.appointment.findMany({
      where: pastAppointmentCondition,
    });

    await prisma.$transaction([
      prisma.pastAppointment.createMany({ data: pastAppointments }),

      prisma.appointment.deleteMany({ where: pastAppointmentCondition }),
    ]);
  } catch (err) {
    console.log(err);
  }
};
