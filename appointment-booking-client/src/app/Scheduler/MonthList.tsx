import { memo } from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { useGetCalenderMonths } from "./hooks";

import { Month } from "./Month";

export const MonthList: React.FC = memo(() => {
  const months = useGetCalenderMonths();

  return (
    <Container>
      {months.map((month, i) => (
        <Month key={i} days={month} />
      ))}
    </Container>
  );
});

const Container = styled(Flex)`
  flex: 1;
  flex-direction: column;
  position: relative;
  top: ${({ theme }) => theme.scheduler.headerHeight};
`;
