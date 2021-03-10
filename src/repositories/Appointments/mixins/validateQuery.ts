import { Time } from "../../../types";

export const validateQuery = (query: any) => {
  const validQuery: Time = {};

  const assignQueryField = (field: string): void => {
    if (isValidTimeField(field)) {
      const num = toNumber(query[field]);
      if (num !== false) validQuery[field as keyof Time] = num;
    }
  };

  for (let field in query) assignQueryField(field);

  assignYearValue(validQuery);

  return validQuery;
};

const isValidTimeField = (field: string): boolean => {
  if (
    field === "year" ||
    field === "month" ||
    field === "day" ||
    field === "hour" ||
    field === "minute"
  )
    return true;
  return false;
};

const toNumber = (queryArg: keyof Time): number | false => {
  const num = Number(queryArg);
  if (isNaN(num)) {
    return false;
  } else return num;
};

/*
Assign a year value that returns future appointments 
if a month value and no year value is provided
*/
const assignYearValue = (validQuery: Time): void => {
  if (typeof validQuery.month === "number" && !validQuery.year) {
    const now = new Date();
    if (now.getMonth() > validQuery.month)
      validQuery.year = now.getFullYear() + 1;
    else validQuery.year = now.getFullYear();
  }
};
