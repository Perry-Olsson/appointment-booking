import { prisma } from "../../prisma";
import { createAppointments, seedAppointments } from "./appointments";

async function main() {
  await seedAppointments(createAppointments(45, 5));
}

main()
  .catch(e => {
    throw e;
  })
  .finally(() => prisma.$disconnect());
