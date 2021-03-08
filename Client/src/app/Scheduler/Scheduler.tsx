import { Flex } from "../../components";
import { useFetchAppointments } from "../../hooks";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  useFetchAppointments();

  return (
    <Flex>
      <DaysOfTheWeek />
      <MonthList />
    </Flex>
  );
}
