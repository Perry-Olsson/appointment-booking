import { Appointment, Prisma } from "@prisma/client";
import { NewAppointment, Time } from "../../types";

export interface AppointmentRepo
  extends AppointmentMixin,
    Prisma.AppointmentDelegate<
      | boolean
      | ((error: Error) => Error)
      | Prisma.RejectPerOperation
      | undefined
    > {}

export interface AppointmentMixin {
  validateQuery: ValidateQuery;
  initialize: Initialize;
  exposed: Exposed;
  isDuplicate: IsDuplicate;
  validateNewAppointment: ValidateNewAppointment;
  validateTimestamp: ValidateTimestamp;
  validateTime: ValidateTime;
  findManyRaw: FindManyRaw;
}

//mixins
export type ValidateQuery = (query: any) => TimeBoundry;
export interface TimeBoundry {
  hasQueryString: boolean;
  start: number;
  end: number;
}

export type Initialize = (req: any) => NewAppointment;

export type IsDuplicate = (newAppointment: NewAppointment) => Promise<void>;

export type ValidateNewAppointment = (reqBody: any) => NewAppointment;

export type ValidateTimestamp = (reqField: any) => Date;

export type ValidateTime = (newAppointment: NewAppointment) => void;

export type FindManyRaw = (query: FindManyRawArgs) => Promise<Appointment[]>;

interface FindManyRawArgs {
  args?: Time;
  select?: string;
  options?: string;
}

export interface Exposed {
  findMany: (
    where?: Omit<Prisma.AppointmentWhereInput, "customerId" | "customer">
  ) => Promise<Appointment[]>;
  findManyRaw: FindManyRaw;
  findUnique: (
    query: Prisma.AppointmentFindUniqueArgs
  ) => Promise<Appointment | null>;
}

export interface ExposedAppointment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  timestamp: Date;
  end: Date;
}
