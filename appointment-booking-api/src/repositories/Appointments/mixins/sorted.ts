import { prisma } from "../../../prisma";
import { Sorted } from "../types";
import { findManyRaw } from "./findManyRaw";

export const sorted: Sorted = {
  findMany: async function (query = {}) {
    query.orderBy = { timestamp: "asc" };

    return await prisma.appointment.findMany(query);
  },
  findManyRaw: async function (query) {
    const options = query.options || ";";
    return await findManyRaw({
      ...query,
      options: " ORDER BY timestamp ASC" + options,
    });
  },
};
