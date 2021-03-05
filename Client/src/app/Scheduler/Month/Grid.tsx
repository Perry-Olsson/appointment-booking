import styled from "styled-components";
import { device } from "../../../components/device";
import { CalenderGrid } from "../components";
import { DateList } from "./DateList";

export const Grid: React.FC<GridProps> = ({ days }) => {
  return (
    <Container>
      <DateList days={days} />
    </Container>
  );
};

interface GridProps {
  days: Date[];
}

const Container = styled(CalenderGrid)`
  @media (min-width: ${device.tablet}) {
    border-top: 1px solid;
    border-left: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
    margin: 1rem 0 5rem 0;
  }
`;
