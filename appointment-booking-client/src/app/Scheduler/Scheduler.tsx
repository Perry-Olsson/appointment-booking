import { useRouter } from "next/router";
import { Flex } from "../../components";
import { useGetUser } from "../../context";
import { Header } from "./Header";
import { MonthList } from "./MonthList";
import { LoadingIcon } from "../../components";

export default function Scheduler() {
  const user = useGetUser();
  const router = useRouter();

  if (!user) router.push("/login");

  if (!user || user === "loading") return <LoadingIcon />;

  return (
    <Flex>
      <Header />
      <MonthList />
    </Flex>
  );
}
