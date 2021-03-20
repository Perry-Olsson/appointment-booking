import { prisma } from "../..";

export const clearDb = async () => {
  await prisma.appointment.deleteMany();
  await prisma.customer.deleteMany();
};
