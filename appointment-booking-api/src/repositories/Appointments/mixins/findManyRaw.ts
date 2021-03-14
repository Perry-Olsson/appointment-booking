import { prisma } from "../../../prisma";
import { FindManyRaw } from "../types";

export const findManyRaw: FindManyRaw = async (query = {}, options = ";") => {
  if (typeof query.month === "number") query.month++;

  let sqlString = 'SELECT * FROM "Appointment"';
  const initialLength = sqlString.length;

  for (const timestampField in query) {
    sqlString.length === initialLength
      ? (sqlString += " WHERE ")
      : (sqlString += " AND ");

    sqlString += `extract(${timestampField} from timestamp) = ${
      query[timestampField as keyof typeof query]
    }`;
  }

  sqlString += options;

  return await prisma.$queryRaw(sqlString);
};
