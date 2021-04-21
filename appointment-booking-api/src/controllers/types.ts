import { Appointment, Procedure, Provider, ServiceHours } from "@prisma/client";
import {
  ExposedAppointment,
  TimeBoundry,
} from "../repositories/appointment/types";
import { DefaultCustomer } from "../repositories/customer/types";
import { NewAppointment } from "../types";

export interface AppointmentDAO {
  getAppointments(timeBoundry: TimeBoundry): Promise<ExposedAppointment[]>;
  getUniqueAppointment(date: Date): Promise<ExposedAppointment | null>;
  create(appointment: NewAppointment): Promise<Appointment>;
  isDuplicate(appointment: NewAppointment): Promise<void>;
}

export interface CustomerDAO {
  create(req: any): Promise<DefaultCustomer>;
  login(req: any): Promise<DefaultCustomer>;
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
