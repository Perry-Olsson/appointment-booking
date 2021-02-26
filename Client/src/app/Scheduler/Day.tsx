import React from "react";
import styled from "styled-components";
import { Flex } from "../../components";

export const Day: React.FC<DayProps> = ({ day, ...restProps }) => {
  return <Container {...restProps}>{day.getDate()}</Container>;
};

interface DayProps {
  day: Date;
  restProps?: React.HTMLAttributes<any>;
}

const Container = styled(Flex)`
  height: ${({ theme }) => `${theme.grid.rawWidth / 7}vw`};
  max-height: ${({ theme }) => `${theme.grid.rawMaxWidth / 7}px`};
`;
