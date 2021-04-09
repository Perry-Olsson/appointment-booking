import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";

const Day = () => {
  const { error, day, appointments } = useDayState();
  useUpdateMonthList();
  useSetOverflow();

  if (!appointments) return <div>loading...</div>;

  if (!day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  return <DayView day={day} appointments={appointments} />;
};

export default Day;
