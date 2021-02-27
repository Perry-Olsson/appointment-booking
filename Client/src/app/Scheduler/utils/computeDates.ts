import { ONE_DAY } from "../../../constants";

export const computeDates = (now: Date): Array<Date[]> => {
  let firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const months: Array<Date[]> = [];

  for (let i = 0; i < 12; i++) {
    const month: Date[] = [firstOfMonth];
    let nextDay = new Date(firstOfMonth.valueOf() + ONE_DAY);
    while (nextDay.getMonth() === firstOfMonth.getMonth()) {
      month.push(nextDay);
      nextDay = new Date(nextDay.valueOf() + ONE_DAY);
    }
    months.push(month);
    firstOfMonth = nextDay;
  }
  return months;
};
