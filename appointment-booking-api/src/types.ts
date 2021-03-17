import { Appointment, Customer } from "@prisma/client";

export type NewAppointment = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;

export type NewCustomer = Omit<Customer, "id" | "createdAt" | "updatedAt">;

export interface Time {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
}
