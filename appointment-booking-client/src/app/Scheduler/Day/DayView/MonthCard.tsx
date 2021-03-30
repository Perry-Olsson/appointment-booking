import styled from "styled-components";
import { device } from "../../../../components/device";
import { monthsAtom, nowAtom } from "../../atoms";
import { CalenderGrid } from "../../components";
import { DaysOfTheWeek } from "../../components/DaysOfTheWeek";
import { useAtom } from "jotai";
import { Grid } from "../../Month/Grid";
import { Flex } from "../../../../components";
import { monthString } from "../../../../constants";
import { Months } from "../../types";

export const MonthCard: React.FC<MonthCardProps> = ({ day }) => {
  const [months] = useAtom(monthsAtom);
  const month = getMonth(months, day);

  return (
    <Container>
      <MonthName>
        {monthString[month[0].getMonth()]} {month[0].getFullYear()}
      </MonthName>
      <GridContainer>
        <Header>
          <DaysOfTheWeek />
        </Header>
        <Grid days={month} small={true} />
      </GridContainer>
    </Container>
  );
};

const getMonth = ({ edges }: Months, day: Date): Date[] => {
  const year = day.getFullYear();
  const month = day.getMonth();
  for (let i = 0; i < edges.length; i++) {
    if (year === edges[i][0].getFullYear() && month === edges[i][0].getMonth())
      return edges[i];
  }
  return edges[0];
};

interface MonthCardProps {
  day: Date;
}

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

const Header = styled(CalenderGrid)``;

const MonthName = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
`;
