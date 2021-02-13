import { Appointment, Prisma, PrismaClient } from "@prisma/client";

export interface AppointmentRepository
  extends Prisma.AppointmentDelegate<
    boolean | ((error: Error) => Error) | Prisma.RejectPerOperation | undefined
  > {
  sorted: Sorted;
}

export interface Sorted {
  findMany: (args?: Prisma.AppointmentFindManyArgs) => Promise<Appointment[]>;
}

export interface AppointmentMixin {
  sorted: Sorted;
}

export type mixin<T, K> = (prisma: PrismaClient, addIns: T) => K;
