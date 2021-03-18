import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import customers from "./json/customers.json";
import { NewCustomer } from "../../types";

export const seedCustomers = async () => {
  await prisma.customer.deleteMany();

  for (let i = 0; i < customers.length; i++) {
    const newCustomer = customers[i] as NewCustomer;

    if (newCustomer.type === "USER")
      newCustomer.password = await bcrypt.hash(newCustomer.password!, 8);

    await prisma.customer.create({ data: newCustomer });
  }

  await prisma.$disconnect();
};

seedCustomers();
