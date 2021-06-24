import cron from "node-cron";
import { transferPastAppointments } from "./transferPastAppointments";
import chalk from "chalk";

export function cronJobs() {
  cron.schedule(
    "59 23 * * *",
    async () => {
      const date = new Date();
      console.log(chalk.green("Running transfer past appointments"));
      console.log(chalk.magenta("Date: "), chalk.blue(date));
      console.log(
        chalk.magenta("Timezone offset: "),
        chalk.blue(date.getTimezoneOffset())
      );
      await transferPastAppointments();
      console.log(chalk.green("Finished running pastAppointments"));
    },
    {
      timezone: "America/Los_Angeles",
    }
  );
}

export * from "./transferPastAppointments";
