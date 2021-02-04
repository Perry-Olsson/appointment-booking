import { useState } from "react";
import styled from "styled-components";

import { Flex } from "../../../components";
import { months } from "../../../constants";
import { useNow } from "../../../context";
import { Grid } from "../Grid";
import { Header } from "./Header";

export const Month: React.FC = () => {
  const now = useNow();
  const [monthList] = useState(createMonthsList(now));
  const [index, setIndex] = useState(now.getMonth());

  return (
    <Container>
      <Header month={monthList[index]} setIndex={setIndex} />
      <Grid month={monthList[index]} />
    </Container>
  );
};

const createMonthsList = (now: Date) => {
  const currentMonth = now.getMonth();
  const year = now.getFullYear();

  return months.map((month, i) => {
    return {
      ...month,
      days: month.name === "February" && year % 4 === 0 ? 29 : month.days,
      year: i < currentMonth ? year + 1 : year,
    };
  });
};

const Container = styled(Flex)`
  margin: 1rem;
  flex-direction: column;
`;
