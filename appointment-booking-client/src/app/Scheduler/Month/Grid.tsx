import styled from "styled-components";
import { device } from "../../../components/device";
import { CalenderGrid } from "../components";
import { DateList } from "./DateList";
import { Date } from "./Date";
import { IsMonthCardProvider } from "./context/IsMonthCard";

export const Grid: React.FC<GridProps> = ({ days, isMonthCard = false }) => {
  return (
    <IsMonthCardProvider isCard={isMonthCard}>
      <Container isMonthCard={isMonthCard}>
        <GridOffset days={days} />
        <DateList days={days} />
      </Container>
    </IsMonthCardProvider>
  );
};

interface GridProps {
  days: Date[];
  isMonthCard?: boolean;
}

const Container = styled(CalenderGrid)<{ isMonthCard: boolean }>`
  @media (min-width: ${({ isMonthCard }) =>
      isMonthCard ? "1000000px" : device.tablet.pixels}) {
    border-top: 1px solid;
    border-left: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
    margin: 1rem 0 5rem 0;
    width: 95%;
  }
`;

const GridOffset: React.FC<GridProps> = ({ days }) => {
  const nullDates: React.ReactNode[] = [];
  for (let i = 0; i < days[0].getDay(); i++) {
    nullDates.push(<Date key={i} day={null} />);
  }
  return <>{nullDates}</>;
};
