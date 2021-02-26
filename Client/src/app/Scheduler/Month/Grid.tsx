import styled from "styled-components";

import { Day } from "../Day";

export const Grid: React.FC<GridProps> = ({ days }) => {
  return (
    <Container>
      {days.map((day, i) => {
        if (i === 0) return <OffsetDay key={day.valueOf()} day={day} />;
        return <Day key={day.valueOf()} day={day} />;
      })}
    </Container>
  );
};

interface GridProps {
  days: Date[];
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: ${({ theme }) => theme.grid.width};
  max-width: ${({ theme }) => theme.grid.maxWidth};
`;

const OffsetDay = styled(Day)`
  grid-column: ${({ day }) => day.getDay() + 1};
`;
