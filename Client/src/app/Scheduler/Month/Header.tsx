import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { Flex } from "../../../components";
import { Month } from "../types";
import { Arrow } from "./Arrow";

export const Header: React.FC<HeaderProps> = ({ month, setIndex }) => {
  const [monthCounter, setMonthCounter] = useState(0);

  const handleRightArrowClick = () => {
    if (month.name === "December") setIndex(0);
    else setIndex(index => index + 1);
    setMonthCounter(monthCounter => monthCounter + 1);
  };

  const handleLeftArrowClick = () => {
    if (month.name === "January") setIndex(11);
    else setIndex(index => index - 1);
    setMonthCounter(monthCounter => monthCounter - 1);
  };

  return (
    <Container>
      <LeftArrow display={monthCounter !== 0} onClick={handleLeftArrowClick} />
      <h1>{month.name}</h1>
      <Arrow display={monthCounter !== 11} onClick={handleRightArrowClick} />
    </Container>
  );
};

interface HeaderProps {
  month: Month;
  setIndex: Dispatch<SetStateAction<number>>;
}

const LeftArrow = styled(Arrow)`
  transform: rotate(180deg);
`;

const Container = styled(Flex)`
  justify-content: space-between;
  width: 300px;
`;
