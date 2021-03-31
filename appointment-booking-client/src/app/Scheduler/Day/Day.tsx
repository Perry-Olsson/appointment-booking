import { concatMonths } from "../hooks";
import { useDayState } from "./hooks";
import { DayView } from "./DayView";

const Day = () => {
  const { error, day, appointments, months, setMonths } = useDayState();

  if (!appointments) return <div>loading...</div>;

  if (!day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  if (months.cursor.valueOf() < day.valueOf()) setMonths(concatMonths(months));

  return <DayView day={day} appointments={appointments} />;
};

export default Day;
