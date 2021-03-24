import { prisma } from "../../../prisma";
import { FindManyRaw } from "../types";

export const findManyRaw: FindManyRaw = async ({
  args = {},
  select = "*",
  options = ";",
}) => {
  if (typeof args.month === "number") args.month++;

  let sqlString = `SELECT ${select} FROM "Appointment"`;
  const initialLength = sqlString.length;

  for (const timestampField in args) {
    sqlString.length === initialLength
      ? (sqlString += " WHERE ")
      : (sqlString += " AND ");

    sqlString += `extract(${timestampField} from timestamp) = ${
      args[timestampField as keyof typeof args]
    }`;
  }

  sqlString += options;

  return await prisma.$queryRaw(sqlString);
};
