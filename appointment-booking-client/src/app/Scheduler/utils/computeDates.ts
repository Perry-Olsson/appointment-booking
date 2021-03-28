import { ONE_DAY } from "../../../constants";
import { Months } from "../types";

export const computeDates = (cursor: Date, monthsToGenerate = 3): Months => {
  const months: Array<Date[]> = [];

  for (let i = 0; i < monthsToGenerate; i++) {
    months.push(computeMonth(cursor));

    cursor = getNextMonth(cursor);
  }

  return { edges: months, cursor };
};

const computeMonth = (firstOfMonth: Date): Date[] => {
  const month: Date[] = [firstOfMonth];
  const currentMonth = firstOfMonth.getMonth();
  let nextDay = new Date(firstOfMonth.valueOf() + ONE_DAY);

  while (nextDay.getMonth() === currentMonth) {
    month.push(nextDay);
    nextDay = new Date(
      nextDay.getFullYear(),
      nextDay.getMonth(),
      nextDay.getDate() + 1
    );
  }

  return month;
};

const getNextMonth = (month: Date) => {
  return new Date(month.getFullYear(), month.getMonth() + 1);
};
