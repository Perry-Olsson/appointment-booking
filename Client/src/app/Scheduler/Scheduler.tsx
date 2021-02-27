import { useMemo } from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { NowProvider, useNow } from "../../context";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { Month } from "./Month";
import { computeDates } from "./utils/computeDates";

export default function SchedulerContainer() {
  return (
    <NowProvider>
      <Flex>
        <DaysOfTheWeek />
        <Scheduler />
      </Flex>
    </NowProvider>
  );
}

export const Scheduler: React.FC = () => {
  const now = useNow();
  const months = useMemo(() => computeDates(now), [now]);

  return (
    <Container>
      {months.map((month, i) => (
        <Month key={i} days={month} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: ${({ theme }) => theme.scheduler.headerHeight};
  z-index: -1;
`;
