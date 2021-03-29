import styled from "styled-components";
import { device } from "../../../components/device";
import { CalenderGrid } from "../components";
import { DateList } from "./DateList";
import { Date } from "./Date";
import { dimensionsAtom } from "../atoms";
import { useAtom } from "jotai";

export const Grid: React.FC<GridProps> = ({ days }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return width > device.tablet.width ? (
    <Container>
      <GridOffset days={days} />
      <DateList days={days} />
    </Container>
  ) : (
    <SmallScreen>
      <GridOffset days={days} />
      <DateList days={days} />
    </SmallScreen>
  );
};

interface GridProps {
  days: Date[];
}

const Container = styled(CalenderGrid)`
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: ${({ theme }) => theme.grid.borderColor};
  margin: 1rem 0 5rem 0;
  width: 95%;
`;

const SmallScreen = styled(CalenderGrid)``;

const GridOffset: React.FC<GridProps> = ({ days }) => {
  const nullDates: React.ReactNode[] = [];
  for (let i = 0; i < days[0].getDay(); i++) {
    nullDates.push(<Date key={i} day={null} />);
  }
  return <>{nullDates}</>;
};
