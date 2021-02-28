import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components";
import { useNow } from "../../../context";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  const { today } = useNow();
  if (today.valueOf() === day.valueOf()) {
    return (
      <GridCell>
        <Today>{day.getDate()}</Today>
      </GridCell>
    );
  }
  return (
    <GridCell {...restProps}>
      <InnerCircle>{day.getDate()}</InnerCircle>
    </GridCell>
  );
};

interface DayProps {
  day: Date;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)`
  height: ${({ theme }) => `${theme.grid.rawWidth / 7}vw`};
  max-height: ${({ theme }) => `${theme.grid.rawMaxWidth / 7}px`};
`;

const InnerCircle = styled(Flex)`
  height: 60%;
  width: 60%;
  border-radius: 50%;
  &:hover {
    background-color: gray;
  }
  transition: 0.15s;
`;

const Today = styled(InnerCircle)`
  border: solid 1px;
  border-color: gray;
`;
