import styled from "styled-components";
import { CalenderGrid } from "./components";
import { DaysOfTheWeek } from "./components/DaysOfTheWeek";

export const Header: React.FC = () => {
  return (
    <Container>
      <DaysOfTheWeek />
    </Container>
  );
};

const Container = styled(CalenderGrid)`
  position: fixed;
  z-index: 1;
  top: ${({ theme }) => theme.navBar.height};
  height: ${({ theme }) => theme.scheduler.headerHeight};
  font-weight: bold;
  background-color: white;
`;
