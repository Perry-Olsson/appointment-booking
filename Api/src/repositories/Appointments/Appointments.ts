import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import { initialize, sorted, validateQuery, isDuplicate } from "./mixins";

export const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize,
  isDuplicate,
  sorted,
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };
