import { ONE_DAY, ONE_HOUR } from "../../../constants";

export const computeDates = (
  monthListCursor: Date,
  monthsToGenerate = 3
): { edges: Array<Date[]>; cursor: Date } => {
  let firstOfMonth = new Date(
    monthListCursor.getFullYear(),
    monthListCursor.getMonth(),
    1
  );
  const months: Array<Date[]> = [];

  for (let i = 0; i < monthsToGenerate; i++) {
    const month: Date[] = [firstOfMonth];
    let nextDay = new Date(firstOfMonth.valueOf() + ONE_DAY);
    while (nextDay.getMonth() === firstOfMonth.getMonth()) {
      if (nextDay.getHours() === 23)
        nextDay = new Date(nextDay.valueOf() + ONE_HOUR);
      else if (nextDay.getHours() === 1) nextDay.setHours(0);
      month.push(nextDay);
      nextDay = new Date(nextDay.valueOf() + ONE_DAY);
    }
    months.push(month);
    firstOfMonth = nextDay;
  }
  return { edges: months, cursor: firstOfMonth };
};
