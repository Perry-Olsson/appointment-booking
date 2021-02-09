import { Appointment } from "@prisma/client";

export type NewAppointment = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;
