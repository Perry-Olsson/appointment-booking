import { useMemo } from "react";
import styled from "styled-components";

import { useNow } from "../../context";
import { Month } from "./Month";
import { computeDates } from "./utils";

export const MonthList: React.FC = () => {
  const { now } = useNow();
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
`;
