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
  sorted: Sorted;
  isDuplicate: IsDuplicate;
  validateTimestamp: ValidateTimestamp;
  findManyRaw: FindManyRaw;
}

export type ValidateQuery = (query: any) => Time;

export type Initialize = (req: any) => NewAppointment;

export type IsDuplicate = (newAppointment: NewAppointment) => Promise<void>;

export type ValidateTimestamp = (timestamp: string) => void;

export type FindManyRaw = (
  args: Time,
  options?: string
) => Promise<Appointment[]>;

export interface Sorted {
  findMany: (args?: Prisma.AppointmentFindManyArgs) => Promise<Appointment[]>;
  findManyRaw: FindManyRaw;
}
