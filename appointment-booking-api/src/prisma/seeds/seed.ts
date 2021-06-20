import {
  seedProcedures,
  seedProviders,
  seedSchedules,
  seedServiceHours,
} from ".";
import { prisma } from "../prisma";
import { seedCustomers } from "./customers";
import { clearDb } from "./utils";

async function main() {
  await clearDb();
  await seedProviders();
  await seedProcedures();
  await seedSchedules();
  await seedServiceHours();
  await seedCustomers();
}

main().finally(() => prisma.$disconnect());
