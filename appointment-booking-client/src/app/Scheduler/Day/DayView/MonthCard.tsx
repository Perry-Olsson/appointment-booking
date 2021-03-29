import styled from "styled-components";
import { device } from "../../../../components/device";
import { monthsAtom, nowAtom } from "../../atoms";
import { CalenderGrid } from "../../components";
import { DaysOfTheWeek } from "../../components/DaysOfTheWeek";
import { useAtom } from "jotai";
import { Grid } from "../../Month/Grid";
import { Flex } from "../../../../components";

export const MonthCard: React.FC = () => {
  const [{ today }] = useAtom(nowAtom);
  const [months] = useAtom(monthsAtom);

  return (
    <Container>
      <GridContainer>
        {months.edges[0][0].getMonth()}
        <Header>
          <DaysOfTheWeek />
        </Header>
        <Grid days={months.edges[0]} small={true} />
      </GridContainer>
    </Container>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  border: solid;
  @media (max-width: ${device.desktop.pixels}) {
    display: none;
  }
`;

const GridContainer = styled.div`
  margin: 1rem 0;
  width: 90%;
  text-align: center;
`;

const Header = styled(CalenderGrid)``;
