import { useMemo } from "react";
import { ONE_DAY } from "../../constants";
import { NowProvider, useNow } from "../../context";
import { Month } from "./Month";

export default function ScheduleContainer() {
  return (
    <NowProvider>
      <Scheduler />
    </NowProvider>
  );
}

export const Scheduler: React.FC = () => {
  const now = useNow();
  const months = useMemo(() => computeDates(now), [now]);

  return (
    <>
      {months.map((month, i) => (
        <Month key={i} days={month} />
      ))}
    </>
  );
};

const computeDates = (now: Date): Array<Date[]> => {
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
