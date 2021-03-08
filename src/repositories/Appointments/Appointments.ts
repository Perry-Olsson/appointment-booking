import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import {
  initialize,
  sorted,
  validateQuery,
  isDuplicate,
  validateTimestamp,
  validateTime,
  findManyRaw,
} from "./mixins";

const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize,
  isDuplicate,
  validateTimestamp,
  validateTime,
  sorted,
  findManyRaw,
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };