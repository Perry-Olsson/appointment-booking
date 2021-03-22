import {
  createAppointments,
  seedAppointments,
} from "../../src/prisma/seeds/appointments";
import { seedCustomers } from "../../src/prisma/seeds/customers";
import { clearDb } from "../../src/prisma/seeds/utils";

export async function initializeTestData() {
  await clearDb();
  await seedCustomers();
  await seedAppointments(createAppointments(5, 2));
}
