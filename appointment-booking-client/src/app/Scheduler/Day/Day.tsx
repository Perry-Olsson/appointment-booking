import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";
import { DayProvider } from "./context/DayProvider";

const Day = () => {
  const dayState = useDayState();
  useUpdateMonthList();
  useSetOverflow();

  if (!dayState.serviceHours.length) return <div>loading...</div>;

  if (!dayState.day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return (
    <DayProvider value={dayState.day}>
      <DayView {...dayState} />
    </DayProvider>
  );
};

export default Day;
