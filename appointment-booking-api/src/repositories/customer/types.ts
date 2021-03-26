import { Type } from "@prisma/client";

export interface DecodedToken {
  email: string;
  iat: number;
}

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
}

export interface CustomerResponse {
  customer: DefaultCustomer;
  token: string;
}
