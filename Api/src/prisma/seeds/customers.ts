import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import customers from "./json/customers.json";
import { Prisma } from "@prisma/client";
import { createNewCustomerAppointment, timestamper } from "./utils";

export const seedCustomers = async (includeAppointments = true) => {
  for (let i = 0; i < customers.length; i++) {
    const newCustomer = { ...customers[i] } as Prisma.CustomerCreateInput;

    if (newCustomer.type === "USER")
      newCustomer.password = await bcrypt.hash(newCustomer.password!, 8);

    if (includeAppointments) {
      const timestamp = timestamper.getNextTimestamp(i === 0 ? 0 : 1);
      timestamp.setUTCHours(17);
      newCustomer.appointments = {
        create: createNewCustomerAppointment(timestamp),
      };
    }

    await prisma.customer.create({
      data: newCustomer,
    });
  }

  await prisma.$disconnect();
};
