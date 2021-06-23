import { prisma } from "../..";

export const clearDb = async () => {
  await prisma.appointment.deleteMany();
  await prisma.pastAppointment.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.serviceHours.deleteMany();
};
