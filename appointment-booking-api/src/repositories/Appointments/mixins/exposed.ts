import { Prisma } from ".prisma/client";
import { findManyRaw } from ".";
import { exposedFields } from "../../../constants";
import { prisma } from "../../../prisma";
import { Exposed } from "../types";

export const exposed: Exposed = {
  findMany: async function (where = {}) {
    const query: Prisma.AppointmentFindManyArgs = {
      select: exposedFields,
    };

    return await prisma.appointment.findMany({ ...query, where });
  },
  findManyRaw: async function (query, options = ";") {
    return await findManyRaw(query, " ORDER BY timestamp ASC" + options);
  },
};
