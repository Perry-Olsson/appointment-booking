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
  display: grid;
  position: absolute;
  bottom: 5px;
  grid-template-columns: repeat(7, 1fr);
  width: ${({ theme }) => theme.grid.width};
  max-width: ${({ theme }) => theme.grid.maxWidth};
`;

const Cell = styled(Flex)``;
