import { Prisma } from "@prisma/client";

export const validateQuery = (query: any) => {
  const validQuery: Prisma.AppointmentWhereInput = {};

  const assignQueryField = (field: AppointmentField): void => {
    const num = isNumber(query[field]);
    if (num !== false) validQuery[field] = num;
  };

  for (let field in query) {
    switch (field) {
      case "year":
        assignQueryField("year");
        break;
      case "month":
        assignQueryField("month");
        break;
      case "day":
        assignQueryField("day");
        break;
      case "hour":
        assignQueryField("hour");
        break;
      case "minute":
        assignQueryField("minute");
        break;
    }
  }

  if (typeof validQuery.month === "number" && !validQuery.year) {
    const now = new Date();
    if (now.getMonth() > validQuery.month)
      validQuery.year = now.getFullYear() + 1;
  }
  return validQuery;
};

const isNumber = (queryArg: AppointmentField): number | false => {
  const num = Number(queryArg);
  if (isNaN(num)) {
    return false;
  } else return num;
};

type AppointmentField = "year" | "month" | "day" | "hour" | "minute";
