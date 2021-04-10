import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";

const Day = () => {
  const { error, loading, day, appointments } = useDayState();
  useUpdateMonthList();

  if (error) return <div>Can't connect to server</div>;

  if (!appointments || loading) return <div>loading...</div>;

  if (!day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return <DayView day={day} appointments={appointments} />;
};

export default Day;
