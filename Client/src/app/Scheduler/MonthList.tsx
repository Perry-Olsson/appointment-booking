import { useAtom } from "jotai";
import { useMemo } from "react";
import styled from "styled-components";

import { currentTime } from "./atoms";
import { Month } from "./Month";
import { computeDates } from "./utils";

export const MonthList: React.FC = () => {
  const [{ today }] = useAtom(currentTime);
  const months = useMemo(() => computeDates(today), [today]);

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
