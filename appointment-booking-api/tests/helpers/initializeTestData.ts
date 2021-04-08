import {
  createAppointments,
  seedAppointments,
  seedCustomers,
  seedProcedures,
  seedProviders,
  seedSchedules,
  seedServiceHours,
} from "../../src/prisma/seeds";
import { clearDb } from "../../src/prisma/seeds/utils";

export async function initializeTestData() {
  await clearDb();
  await seedProviders();
  await seedProcedures();
  await seedSchedules();
  await seedServiceHours();
  await seedCustomers();
  await seedAppointments(createAppointments(5, 2));
}
