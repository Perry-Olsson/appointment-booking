import { prisma } from "../../prisma";
import { createAppointments, seedAppointments } from "./appointments";

async function main() {
  const args = process.argv;
  if (
    args.includes("appointments") ||
    args.includes("-a") ||
    process.argv.length === 2
  ) {
    let days = 10;
    let appointments = 2;

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
