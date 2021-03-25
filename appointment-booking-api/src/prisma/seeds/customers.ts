import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import customers from "./json/customers.json";
import { Prisma } from ".prisma/client";
import {
  createNewCustomerAppointment,
  getRandomNumberV2,
  timestamper,
} from "./utils";
import { ONE_DAY } from "../../constants";

export const seedCustomers = async (includeAppointments = true) => {
  for (let i = 0; i < customers.length; i++) {
    const newCustomer = customers[i] as Prisma.CustomerCreateInput;

    if (newCustomer.type === "USER")
      newCustomer.password = await bcrypt.hash(newCustomer.password!, 8);

    if (includeAppointments) {
      const timestamp = timestamper.getNextTimestamp(ONE_DAY, 3);
      timestamp.setUTCHours(getRandomNumberV2(16, 23));
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
