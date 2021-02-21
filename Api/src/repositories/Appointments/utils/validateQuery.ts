import { Prisma } from "@prisma/client";

export const validateQuery = (query: any) => {
  const validQuery: Prisma.AppointmentWhereInput = {};

  const assignQueryField = (field: string): void => {
    if (isValidAppointmentField(field)) {
      const num = toNumber(query[field]);
      if (num !== false) validQuery[field as AppointmentField] = num;
    }
  };

  for (let field in query) assignQueryField(field);

  assignYearValue(validQuery);

  return validQuery;
};

const isValidAppointmentField = (field: string): boolean => {
  if (
    field === "year" ||
    field === "month" ||
    field === "day" ||
    field === "hour" ||
    field === "minutes"
  )
    return true;
  return false;
};

const toNumber = (queryArg: AppointmentField): number | false => {
  const num = Number(queryArg);
  if (isNaN(num)) {
    return false;
  } else return num;
};

/*
Assign a year value that returns future appointments 
if a month value and no year value is provided
*/
const assignYearValue = (validQuery: Prisma.AppointmentWhereInput): void => {
  if (typeof validQuery.month === "number" && !validQuery.year) {
    const now = new Date();
    if (now.getMonth() > validQuery.month)
      validQuery.year = now.getFullYear() + 1;
    else validQuery.year = now.getFullYear();
  }
};

type AppointmentField = "year" | "month" | "day" | "hour" | "minute";
