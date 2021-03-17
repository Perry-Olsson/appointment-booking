import { prisma } from "../prisma";

export const seedCustomers = async () => {
  await prisma.customer.deleteMany();
};
