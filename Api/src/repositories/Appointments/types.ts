import { Appointment, Prisma, PrismaClient } from "@prisma/client";
import { NewAppointment } from "../../prisma/seeds/types";

export interface AppointmentRepo
  extends Prisma.AppointmentDelegate<
    boolean | ((error: Error) => Error) | Prisma.RejectPerOperation | undefined
  > {
  initialize: (req: any) => NewAppointment;
  sorted: Sorted;
}

export interface AppointmentMixin {
  initialize: (req: any) => NewAppointment;
  sorted: Sorted;
}

export interface Sorted {
  findMany: (args?: Prisma.AppointmentFindManyArgs) => Promise<Appointment[]>;
}

export type mixin<T, K> = (prisma: PrismaClient, addIns: T) => K;
