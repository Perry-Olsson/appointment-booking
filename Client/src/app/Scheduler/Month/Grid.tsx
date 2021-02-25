import styled from "styled-components";

import { Day } from "../Day";

export const Grid: React.FC = () => {
  return (
    <Container>
      <Day day={new Date()} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: ${({ theme }) => theme.grid.width};
  max-width: ${({ theme }) => theme.grid.maxWidth};
  height: ${({ theme }) => theme.grid.width};
  max-height: ${({ theme }) => theme.grid.maxWidth};
`;
