import { Prisma } from "@prisma/client";
import { validateQuery } from "./utils/validateQuery";
import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";
import { NewAppointment } from "../../types";

export const appointmentsMixin: AppointmentMixin = {
  initialize: function (newAppointment) {
    if (newAppointment.minute % 30 !== 0) {
      throw new InvalidTimeError(
        "Appointments must be scheduled on the hour or half hour"
      );
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
    findMany: async function (query) {
      const findManyArg: Prisma.AppointmentFindManyArgs = {
        orderBy: { timestamp: "asc" },
        where: validateQuery(query),
      };
      return await prisma.appointment.findMany(findManyArg);
    },
  },
};

const Appointments: AppointmentRepo = Object.assign(
  prisma.appointment,
  appointmentsMixin
);

export { Appointments };

class InvalidTimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTimeError";
  }
}
