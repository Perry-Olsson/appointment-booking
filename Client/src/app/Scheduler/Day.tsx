import React from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { useNow } from "../../context";

export const Day: React.FC<DayProps> = ({ day, ...restProps }) => {
  const { today } = useNow();
  if (today.valueOf() === day.valueOf()) {
    return (
      <Container>
        <Today>{day.getDate()}</Today>
      </Container>
    );
  }
  return <Container {...restProps}>{day.getDate()}</Container>;
};

interface DayProps {
  day: Date;
  restProps?: React.HTMLAttributes<any>[];
}

const Container = styled(Flex)`
  height: ${({ theme }) => `${theme.grid.rawWidth / 7}vw`};
  max-height: ${({ theme }) => `${theme.grid.rawMaxWidth / 7}px`};
`;

const Today = styled(Container)`
  height: 60%;
  width: 60%;
  border-radius: 50%;
  background-color: gray;
`;
