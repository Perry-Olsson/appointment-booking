import styled from "styled-components";

export const CalenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: ${({ theme }) => theme.grid.width};
  max-width: ${({ theme }) => theme.grid.maxWidth};
`;
