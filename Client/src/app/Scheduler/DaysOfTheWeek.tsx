import styled from "styled-components";
import { Flex } from "../../components";

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

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.navBar.height};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: ${({ theme }) => theme.scheduler.headerHeight};
  background-color: white;
  width: ${({ theme }) => theme.grid.width};
  max-width: ${({ theme }) => theme.grid.maxWidth};
`;

const Cell = styled(Flex)``;
