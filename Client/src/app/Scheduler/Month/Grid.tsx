import styled from "styled-components";
import { CalenderGrid } from "../components";

import { Date } from "./Date";

export const Grid: React.FC<GridProps> = ({ days }) => {
  return (
    <CalenderGrid>
      {days.map((day, i) => {
        if (i === 0) return <OffsetDay key={day.valueOf()} day={day} />;
        return <Date key={day.valueOf()} day={day} />;
      })}
    </CalenderGrid>
  );
};

interface GridProps {
  days: Date[];
}

const OffsetDay = styled(Date)`
  grid-column: ${({ day }) => day.getDay() + 1};
`;
