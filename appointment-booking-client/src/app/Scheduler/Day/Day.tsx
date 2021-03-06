import { useDayState } from "./hooks";
import { DayView } from "./DayView";
import { useUpdateMonthList } from "./hooks/useUpdateMonthList";
import { useSetOverflow } from "./hooks/useSetOverflow";
import { DayProvider } from "./context/DayProvider";
import { useGetUser } from "../../../context";
import { useRouter } from "next/router";
import { LoadingIcon } from "../../../components";

const Day = () => {
  const dayState = useDayState();
  const user = useGetUser();
  const router = useRouter();
  useUpdateMonthList();
  useSetOverflow();

  if (!user) router.push("/login");

  if (!dayState.serviceHours.loading && !dayState.serviceHours.data.length)
    return <div>Missing critical business operational data</div>;

  if (!dayState.serviceHours.data.length || !user || user === "loading")
    return <LoadingIcon />;

  if (!dayState.day.isValidDate()) return <div>invalid url. Rerouting...</div>;

  return (
    <DayProvider value={dayState.day}>
      <DayView {...dayState} />
    </DayProvider>
  );
};

export default Day;
