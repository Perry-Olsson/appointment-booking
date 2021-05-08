import { Appointment, Type } from "@prisma/client";

export interface Credentials {
  email: string;
  password: string;
}

export interface DefaultCustomer {
  id: number;
  firstName: string;
  lastName: string;
  type: Type;
  email: string;
  phoneNumber: string;
}

export interface LoginCustomer extends DefaultCustomer {
  password?: string | null;
  tokenVersion: number;
}

export interface User extends DefaultCustomer {
  appointments: Appointment[];
}

export interface CustomerResponse {
  customer: DefaultCustomer;
  token: string | null;
}
