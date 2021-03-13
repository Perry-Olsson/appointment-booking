import { Flex } from "../../components";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { usePrefetchAppointments } from "./hooks";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  usePrefetchAppointments();

  return (
    <Flex>
      <DaysOfTheWeek />
      <MonthList />
    </Flex>
  );
}
