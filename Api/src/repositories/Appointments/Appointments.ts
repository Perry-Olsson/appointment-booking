import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import { NewAppointment } from "../../types";
import { InvalidTimeError } from "../../utils";
import { validateQuery } from "./utils/validateQuery";

export const appointmentsMixin: AppointmentMixin = {
  validateQuery,
  initialize: function (newAppointment) {
    if (newAppointment.minute % 30 !== 0) {
      throw new InvalidTimeError();
    }

    if (!newAppointment.timestamp)
      newAppointment.timestamp = new Date(
        newAppointment.year,
        newAppointment.month,
        newAppointment.day,
        newAppointment.hour,
        newAppointment.minute
      );
    newAppointment.timestampz = newAppointment.timestamp;

    return newAppointment as NewAppointment;
  },
  sorted: {
    findMany: async function (query = {}) {
      query.orderBy = { timestamp: "asc" };

      return await prisma.appointment.findMany(query);
    },
  },
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };
