import { Appointment, Prisma } from "@prisma/client";
import { NewAppointment } from "../../types";

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
}

export type ValidateQuery = (query: any) => Prisma.AppointmentWhereInput;

export type Initialize = (req: any) => NewAppointment;

export type IsDuplicate = (newAppointment: NewAppointment) => Promise<void>;

export type ValidateTimestamp = (timestamp: string) => void;

export interface Sorted {
  findMany: (args?: Prisma.AppointmentFindManyArgs) => Promise<Appointment[]>;
  findManyRaw: (args?: Prisma.AppointmentWhereInput) => Promise<Appointment[]>;
}
