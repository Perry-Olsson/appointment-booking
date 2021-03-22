import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import {
  initialize,
  exposed,
  validateQuery,
  isDuplicate,
  validateNewAppointment,
  validateTimestamp,
  validateTime,
  findManyRaw,
} from "./mixins";

const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize,
  isDuplicate,
  validateNewAppointment,
  validateTimestamp,
  validateTime,
  exposed,
  findManyRaw,
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };
