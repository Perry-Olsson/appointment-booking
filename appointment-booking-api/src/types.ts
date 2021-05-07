import { Appointment, Customer } from "@prisma/client";

export interface NewAppointment extends _NewAppointment {
  comments?: string;
}

type _NewAppointment = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt" | "comments"
>;

export type NewCustomer = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt" | "tokenVersion"
>;

export interface Time {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
}
