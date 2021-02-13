import { prisma } from "../app";
import { mixin, AppointmentRepository, AppointmentMixin } from "./types";

const appointmentMixin: AppointmentMixin = {
  sorted: {
    findMany: async function (args = {}) {
      args.orderBy = { timestamp: "asc" };
      return await prisma.appointment.findMany(args);
    },
  },
};

const mixinRepo: mixin<AppointmentMixin, AppointmentRepository> = (
  prisma,
  addIns
) => {
  return Object.assign(prisma.appointment, addIns) as AppointmentRepository;
};

const AppointmentRepository: AppointmentRepository = mixinRepo(
  prisma,
  appointmentMixin
);

export default AppointmentRepository;
