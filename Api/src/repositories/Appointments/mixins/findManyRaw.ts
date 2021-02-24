import { prisma } from "../../../prisma";
import { FindManyRaw } from "../types";

export const findManyRaw: FindManyRaw = async (query = {}, options = ";") => {
  if (typeof query.month === "number") query.month++;

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

  sqlString += options;

  const appointments = await prisma.$queryRaw(sqlString);
  return appointments;
};
