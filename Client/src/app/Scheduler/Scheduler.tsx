import { useAtom } from "jotai";
import { Flex } from "../../components";
import { useFetchAppointments } from "../../hooks";
import { currentTime } from "./atoms";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  const [{ now }] = useAtom(currentTime);
  useFetchAppointments();

  console.log(now);
  return (
    <Flex>
      <DaysOfTheWeek />
      <MonthList />
    </Flex>
  );
}
