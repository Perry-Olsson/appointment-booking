import styled from "styled-components";
import { Flex } from "../../components";
import { CalenderGrid } from "./components";

export const DaysOfTheWeek: React.FC = () => {
  return (
    <Container>
      <Cell>S</Cell>
      <Cell>M</Cell>
      <Cell>T</Cell>
      <Cell>W</Cell>
      <Cell>Th</Cell>
      <Cell>F</Cell>
      <Cell>Sa</Cell>
    </Container>
  );
};

const Container = styled(CalenderGrid)`
  position: fixed;
  z-index: 1;
  top: ${({ theme }) => theme.navBar.height};
  height: ${({ theme }) => theme.scheduler.headerHeight};
  background-color: white;
`;

const Cell = styled(Flex)``;
