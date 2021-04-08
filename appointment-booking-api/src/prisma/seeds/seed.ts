import { prisma } from "../../prisma";
import { createAppointments, seedAppointments } from "./appointments";
import { seedCustomers } from "./customers";
import { seedProcedures } from "./procedures";
import { seedProviders } from "./providers";
import { seedSchedules } from "./schedules";
import { seedServiceHours } from "./serviceHours";
import { clearDb } from "./utils";

async function main() {
  const args = process.argv;

  await clearDb();
  await seedProviders();
  await seedProcedures();
  await seedSchedules();
  await seedServiceHours();

  if (args.includes("customers") || !args.includes("-p")) {
    await seedCustomers();
  }

  if (
    args.includes("appointments") ||
    args.includes("-a") ||
    !args.includes("-p")
  ) {
    let days = 20;
    let appointments = 5;

    const customFlagIndex = args.indexOf("-a");
    if (args.length < customFlagIndex + 2)
      throw Error("Must provide two numbers following -a flag");

    if (customFlagIndex !== -1) {
      days = Number(args[customFlagIndex + 1]);
      appointments = Number(args[customFlagIndex + 2]);
    }

    if (isNaN(days) || isNaN(appointments))
      throw Error("Arguments following -a must be numbers");

    await seedAppointments(createAppointments(days, appointments));
  }
}

main()
  .catch(e => {
    throw e;
  })
  .finally(() => prisma.$disconnect());
