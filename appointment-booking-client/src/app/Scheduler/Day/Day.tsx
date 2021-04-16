import { useGetSelectedDay } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";

const Day = () => {
  const { day } = useGetSelectedDay();
  useUpdateMonthList();
  useSetOverflow();

  if (!day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return <DayView day={day} />;
};

export default Day;
