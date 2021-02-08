import { Appointment } from "@prisma/client";

export type NewAppointment = Pick<
  Appointment,
  "day" | "month" | "year" | "time" | "timestamp"
>;
