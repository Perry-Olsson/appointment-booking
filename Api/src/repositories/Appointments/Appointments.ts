import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";

export const appointmentsMixin: AppointmentMixin = {
  sorted: {
    findMany: async function (args = {}) {
      args.orderBy = { timestamp: "asc" };
      return await prisma.appointment.findMany(args);
    },
  },
};

export const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);
