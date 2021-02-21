import { Appointment, Prisma, PrismaClient } from "@prisma/client";
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
}

export type ValidateQuery = (query: any) => Prisma.AppointmentWhereInput;

export type Initialize = (req: any) => NewAppointment;

export interface Sorted {
  findMany: (args?: Prisma.AppointmentFindManyArgs) => Promise<Appointment[]>;
}

export type mixin<T, K> = (prisma: PrismaClient, addIns: T) => K;
