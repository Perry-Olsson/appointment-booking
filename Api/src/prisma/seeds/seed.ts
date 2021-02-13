import { prisma } from "../../prisma";
import { createAppointments, seedAppointments } from "./appointments";

async function main() {
  seedAppointments(createAppointments());
}

main()
  .catch(e => {
    throw e;
  })
  .finally(() => prisma.$disconnect());
