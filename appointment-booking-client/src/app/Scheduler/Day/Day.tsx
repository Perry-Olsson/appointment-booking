import { concatMonths } from "../hooks";
import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { isValidDate } from "../utils";

const Day = () => {
  const { error, day, appointments, months, setMonths } = useDayState();

  if (!isValidDate(day)) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  if (!appointments) return <div>loading...</div>;

  if (months.cursor.valueOf() < day.valueOf()) setMonths(concatMonths(months));

  return <DayView day={day} appointments={appointments} />;
};

export default Day;
