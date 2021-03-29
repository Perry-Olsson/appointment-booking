import styled from "styled-components";
import { device } from "../../../components/device";
import { CalenderGrid } from "../components";
import { DateList } from "./DateList";
import { Date } from "./Date";

export const Grid: React.FC<GridProps> = ({ days, small }) => {
  return (
    <Container small={small}>
      <GridOffset days={days} small={small} />
      <DateList days={days} small={small} />
    </Container>
  );
};

interface GridProps {
  days: Date[];
  small?: boolean;
}

const Container = styled(CalenderGrid)<{ small: boolean | undefined }>`
  @media (min-width: ${({ small }) =>
      small ? "1000000px" : device.tablet.pixels}) {
    border-top: 1px solid;
    border-left: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
    margin: 1rem 0 5rem 0;
    width: 95%;
  }
`;

const GridOffset: React.FC<GridProps> = ({ days, small }) => {
  const nullDates: React.ReactNode[] = [];
  for (let i = 0; i < days[0].getDay(); i++) {
    nullDates.push(<Date key={i} day={null} small={small} />);
  }
  return <>{nullDates}</>;
};
