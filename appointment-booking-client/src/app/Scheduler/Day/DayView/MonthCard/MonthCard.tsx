import { memo } from "react";
import styled from "styled-components";
import { device } from "../../../../../components";
import { monthsAtom } from "../../../atoms";
import { CalenderGrid } from "../../../components";
import { DaysOfTheWeek } from "../../../components/DaysOfTheWeek";
import { useAtom } from "jotai";
import { Grid } from "../../../Month/Grid";
import { Flex } from "../../../../../components";
import { MonthName } from "./MonthName";
import { getMonth } from "./utils";
import { isDayEqual } from "../../../utils";
import { DayProps } from "../../type";

export const MonthCard: React.FC<DayProps> = memo(({ day }) => {
  const [months] = useAtom(monthsAtom);
  const month = getMonth(months, day);

  return (
    <Container>
      <MonthName month={month} />
      <GridContainer>
        <CalenderGrid>
          <DaysOfTheWeek />
        </CalenderGrid>
        <Grid days={month} isMonthCard={true} />
      </GridContainer>
    </Container>
  );
}, isDayEqual);

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  @media (max-width: ${device.desktop.pixels}) {
    display: none;
  }
`;

const GridContainer = styled.div`
  width: 90%;
`;
