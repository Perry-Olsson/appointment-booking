import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import {
  initialize,
  sorted,
  validateQuery,
  isDuplicate,
  validateTimestamps,
  validateTime,
  findManyRaw,
} from "./mixins";

const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize,
  isDuplicate,
  validateTimestamps,
  validateTime,
  sorted,
  findManyRaw,
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };
