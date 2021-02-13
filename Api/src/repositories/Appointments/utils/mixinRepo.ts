import { prisma } from "../../../prisma";
import { AppointmentMixin, AppointmentRepo, mixin } from "../types";

export const appointmentMixin: AppointmentMixin = {
  sorted: {
    findMany: async function (args = {}) {
      args.orderBy = { timestamp: "asc" };
      return await prisma.appointment.findMany(args);
    },
  },
};

export const mixinRepo: mixin<AppointmentMixin, AppointmentRepo> = (
  prisma,
  addIns
) => {
  return Object.assign(prisma.appointment, addIns) as AppointmentRepo;
};
