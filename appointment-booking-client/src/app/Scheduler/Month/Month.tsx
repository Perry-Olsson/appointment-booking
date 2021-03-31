import styled from "styled-components";

import { Flex } from "../../../components";
import { Header } from "./Header";
import { Grid } from "./Grid";
import { MonthProps } from "./types";

export const Month: React.FC<MonthProps> = ({ days }) => {
  return (
    <Container>
      <Header days={days} />
      <Grid days={days} />
    </Container>
  );
};

const Container = styled(Flex)`
  width: 100%;
  margin: 1rem;
  flex-direction: column;
`;
