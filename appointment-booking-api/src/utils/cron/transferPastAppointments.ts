import { prisma } from "../../prisma";

export const transerPastAppointments = async () => {
  const now = new Date();
  const pastAppointments = await prisma.appointment.findMany({
    where: { timestamp: { lt: now } },
  });

  console.log(pastAppointments);
};

transerPastAppointments().finally(() => prisma.$disconnect());
