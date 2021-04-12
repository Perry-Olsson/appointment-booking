import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";
import { StaticStateProvider } from "./context";

const Day = () => {
  const {
    error,
    providers,
    serviceHours,
    loading,
    day,
    appointments,
  } = useDayState();
  useUpdateMonthList();
  useSetOverflow();

  if (error) return <div>Can't connect to server</div>;

  if (!appointments) return <div>loading...</div>;

  if (!day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return (
    <StaticStateProvider value={{ providers, serviceHours }}>
      <DayView day={day} appointments={appointments} loading={loading} />
    </StaticStateProvider>
  );
};

export default Day;
