import { ONE_DAY } from "../../../constants";

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
      month.push(nextDay);
      nextDay = new Date(nextDay.valueOf() + ONE_DAY);
    }
    months.push(month);
    firstOfMonth = nextDay;
  }
  return { edges: months, cursor: firstOfMonth };
};
