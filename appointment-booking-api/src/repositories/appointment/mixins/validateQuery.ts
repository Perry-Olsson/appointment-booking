import { BoundryError } from "../../../utils";
import { TimeBoundry } from "../types";

export const validateQuery = (query: any): TimeBoundry => {
  if (query.start === undefined || query.end === undefined)
    return { hasQueryString: false, start: 0, end: 0 };

  const start = toMilliseconds(query.start);
  const end = toMilliseconds(query.end);

  if (start === false || end === false) throw new BoundryError();

  return { hasQueryString: true, start, end };
};

const toMilliseconds = (queryField: any): number | false => {
  const date = new Date(queryField);
  const num = Number(date);
  if (isNaN(num)) {
    return false;
  } else return num;
};

/*
Assign a year value that returns future appointments 
if a month value and no year value is provided
*/
