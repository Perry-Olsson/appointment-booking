import styled from "styled-components";

import { Flex } from "../../../components";
import { Header } from "./Header";
import { Grid } from "./Grid";

export const Month: React.FC<MonthProps> = ({ days }) => {
  return (
    <Container>
      <Header month={days[0].getMonth()} />
      <Grid days={days} />
    </Container>
  );
};

interface MonthProps {
  days: Date[];
}

const Container = styled(Flex)`
  width: 100%;
  margin: 1rem;
  flex-direction: column;
`;
