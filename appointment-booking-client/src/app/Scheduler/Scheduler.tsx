import { Flex } from "../../components";
import { Header } from "./Header";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  return (
    <Flex>
      <Header />
      <MonthList />
    </Flex>
  );
}
