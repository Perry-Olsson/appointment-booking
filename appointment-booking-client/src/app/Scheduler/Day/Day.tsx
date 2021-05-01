import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";
import { DayProvider } from "./context/DayProvider";
import { useGetUser } from "../../../context";
import { useRouter } from "next/router";

const Day = () => {
  const dayState = useDayState();
  const user = useGetUser();
  const router = useRouter();
  useUpdateMonthList();
  useSetOverflow();

  if (!user) router.push("/login");

  if (!dayState.serviceHours.length || !user || user === "loading")
    return <div>loading...</div>;

  if (!dayState.day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return (
    <DayProvider value={dayState.day}>
      <DayView {...dayState} />
    </DayProvider>
  );
};

export default Day;
