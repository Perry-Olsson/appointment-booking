import cron from "node-cron";
import { transferPastAppointments } from "./transferPastAppointments";

export function cronJobs() {
  cron.schedule(
    "59 23 * * *",
    async () => {
      console.log("Running transfer past appointments");
      await transferPastAppointments();
      console.log("Finished running pastAppointments");
    },
    {
      timezone: "America/Los_Angeles",
    }
  );
}

export * from "./transferPastAppointments";
