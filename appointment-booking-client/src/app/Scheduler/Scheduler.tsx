import { Flex } from "../../components";
import { StaticStateProvider } from "./Day/context";
import { Header } from "./Header";
import { useFetchProviders, usePrefetchAppointments } from "./hooks";
import { useFetchServiceHours } from "./hooks/useFetchServiceHours";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  usePrefetchAppointments();
  const { serviceHours } = useFetchServiceHours();
  const { providers } = useFetchProviders();

  return (
    <StaticStateProvider value={{ serviceHours, providers }}>
      <Flex>
        <Header />
        <MonthList />
      </Flex>
    </StaticStateProvider>
  );
}
