import { useRouter } from "next/router";
import { Flex } from "../../components";
import { useGetUser } from "../../context";
import { Header } from "./Header";
import { MonthList } from "./MonthList";
import { LoadingIcon } from "../../components";
import styled from "styled-components";

export default function Scheduler() {
  const user = useGetUser();
  const router = useRouter();

  if (!user) router.push("/login");

  if (!user || user === "loading") return <LoadingIcon />;

  return (
    <Container>
      <Header />
      <MonthList />
    </Container>
  );
}

const Container = styled(Flex)`
  flex-direction: row;
`;
