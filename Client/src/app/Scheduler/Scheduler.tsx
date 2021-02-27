import { Flex } from "../../components";
import { NowProvider } from "../../context";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  return (
    <NowProvider>
      <Flex>
        <DaysOfTheWeek />
        <MonthList />
      </Flex>
    </NowProvider>
  );
}
