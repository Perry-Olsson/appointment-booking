import styled from "styled-components";
import { device } from "../../../components/device";
import { CalenderGrid } from "../components";
import { DateList } from "./DateList";
import { Date } from "./Date"

export const Grid: React.FC<GridProps> = ({ days }) => {
  return (
    <Container>
      <GridOffset days={days} />
      <DateList days={days} />
    </Container>
  );
};

interface GridProps {
  days: Date[];
}

const Container = styled(CalenderGrid)`
  @media (min-width: ${device.tablet.pixels}) {
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