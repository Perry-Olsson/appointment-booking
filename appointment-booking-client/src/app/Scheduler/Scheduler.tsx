import { useRouter } from "next/router";
import { Flex } from "../../components";
import { useGetUser } from "../../context";
import { Header } from "./Header";
import { MonthList } from "./MonthList";

export default function Scheduler() {
  const user = useGetUser();
  const router = useRouter();

  if (!user) router.push("/login");

  if (!user || user === "loading") return <div>loading...</div>;

  return (
    <Flex>
      <Header />
      <MonthList />
    </Flex>
  );
}
