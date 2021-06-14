import {
  Appointment,
  Customer,
  Prisma,
  Procedure,
  Provider,
  ServiceHours,
} from "@prisma/client";
import {
  ExposedAppointment,
  TimeBoundry,
} from "../repositories/appointment/types";
import { DefaultCustomer, LoginCustomer } from "../repositories/customer/types";
import { NewAppointment } from "../types";

export interface AppointmentDAO {
  getAppointments(timeBoundry: TimeBoundry): Promise<ExposedAppointment[]>;
  create(appointment: NewAppointment): Promise<Appointment>;
  isDuplicate(appointment: NewAppointment): Promise<void>;
  isConflicting(appointment: NewAppointment): Promise<void>;
}

export interface CustomerDAO {
  create(req: any): Promise<DefaultCustomer>;
  login(req: any): Promise<LoginCustomer>;
  findOne(arg: Prisma.CustomerFindUniqueArgs): Promise<Customer | null>;
  getAppointments(user: DefaultCustomer): Promise<UserAppointment[]>;
}

export interface ProcedureDAO {
  getProcedures(): Promise<Procedure[]>;
}

export interface ProviderDAO {
  getProviders(): Promise<Provider[]>;
}

export interface ServiceHoursDAO {
  getServiceHours(): Promise<ServiceHours[]>;
}

interface UserAppointment {
  procedure: Procedure;
  provider: Provider;
  id: number;
  timestamp: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
  comments: string | null;
}
