import { prisma } from "../../../prisma";
import { Sorted } from "../types";

export const sorted: Sorted = {
  findMany: async function (query = {}) {
    query.orderBy = { timestamp: "asc" };

    return await prisma.appointment.findMany(query);
  },
};
