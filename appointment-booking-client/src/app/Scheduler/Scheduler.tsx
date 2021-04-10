import { Flex } from "../../components";
import { Header } from "./Header";
import { usePrefetchAppointments } from "./hooks";
import { useFetchServiceHours } from "./hooks/useFetchServiceHours";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  usePrefetchAppointments();
  useFetchServiceHours();

  return (
    <Flex>
      <Header />
      <MonthList />
    </Flex>
  );
}
