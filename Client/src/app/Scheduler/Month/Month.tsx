import styled from "styled-components";

import { Flex } from "../../../components";
import { Header } from "./Header";
import { Grid } from "./Grid";

export const Month: React.FC = () => {
  return (
    <Container>
      <Header />
      <Grid />
    </Container>
  );
};

const Container = styled(Flex)`
  margin: 1rem;
  flex-direction: column;
`;
