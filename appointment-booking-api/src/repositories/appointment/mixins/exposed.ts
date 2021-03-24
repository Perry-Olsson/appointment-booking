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
  findManyRaw: async function (query) {
    query.select = `"id", "createdAt", "updatedAt", "timestamp", "end"`;
    return await findManyRaw(query);
  },
  findUnique: async function (query) {
    query.select = exposedFields;

    return await prisma.appointment.findUnique(query);
  },
};
