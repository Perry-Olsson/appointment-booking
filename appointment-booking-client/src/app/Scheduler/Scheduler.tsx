import { Flex } from "../../components";
import { Header } from "./Header";
import { usePrefetchAppointments } from "./hooks";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  usePrefetchAppointments();

  return (
    <Flex>
      <Header />
      <MonthList />
    </Flex>
  );
}
