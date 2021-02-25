import styled from "styled-components";

import { Day } from "./Day";
import { Month } from "./types";

interface GridProps {
  month: Month;
}

export const Grid: React.FC<GridProps> = ({ month }) => {
  return <Container>{renderDays(month)}</Container>;
};

const renderDays = (month: Month) => {
  const days = [];

  for (let i = 1; i <= month.days; i++) {
    days.push(
      <Day
        key={i}
        date={new Date(month.year, month.index, i)}
        last={i === month.days ? true : false}
      ></Day>
    );
  }

  return days;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 50%;
  margin: 2rem;
`;
