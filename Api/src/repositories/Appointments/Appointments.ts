import { Prisma } from "@prisma/client";
import { validateQuery } from "./utils/validateQuery";
import { prisma } from "../../prisma";
import { AppointmentMixin, AppointmentRepo } from "./types";

export const appointmentsMixin: AppointmentMixin = {
  sorted: {
    findMany: async function (query) {
      console.log("validatedQuery: ", validateQuery(query));
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
