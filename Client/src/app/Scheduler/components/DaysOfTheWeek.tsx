import styled from "styled-components";
import { Flex } from "../../../components";

export const DaysOfTheWeek: React.FC = () => {
  return (
    <>
      <Cell>S</Cell>
      <Cell>M</Cell>
      <Cell>T</Cell>
      <Cell>W</Cell>
      <Cell>Th</Cell>
      <Cell>F</Cell>
      <Cell>Sa</Cell>
    </>
  );
};

const Cell = styled(Flex)`
  flex-direction: row;
`;
