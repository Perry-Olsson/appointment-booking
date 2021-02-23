import { prisma } from "../../../prisma";
import { Sorted } from "../types";

export const sorted: Sorted = {
  findMany: async function (query = {}) {
    query.orderBy = { timestamp: "asc" };

    return await prisma.appointment.findMany(query);
  },
  findManyRaw: async function (query = {}) {
    let sqlString = 'SELECT * FROM "Appointment"';
    const initialLength = sqlString.length;

    for (const whereField in query) {
      sqlString.length === initialLength
        ? (sqlString += " WHERE ")
        : (sqlString += " AND ");

      sqlString += `extract(${whereField} from timestamp) = ${
        query[whereField as keyof typeof query]
      }`;
    }

    sqlString += "ORDER BY timestamp ASC;";

    const appointments = await prisma.$queryRaw(sqlString);
    return appointments;
  },
};
