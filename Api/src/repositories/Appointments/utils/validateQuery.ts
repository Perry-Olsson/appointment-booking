import { Prisma } from "@prisma/client";

export const validateQuery = (query: any) => {
  const validQuery: Prisma.AppointmentWhereInput = {};

  if (!query || !query.where) return validQuery;
  const whereInput = query.where;

  const assignQueryField = (field: AppointmentField): void => {
    const num = isNumber(whereInput[field]);
    if (num !== false) validQuery[field] = num;
  };

  for (let field in whereInput) {
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
    else validQuery.year = now.getFullYear();
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
