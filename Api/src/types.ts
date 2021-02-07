import { appointments } from "@prisma/client";

export type NewAppointment = Pick<
  appointments,
  "day" | "month" | "year" | "time" | "timestamp"
>;
