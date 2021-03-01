import React, { useState } from "react";
import styled from "styled-components";

import { Flex } from "../../../components";
import { useNow } from "../../../context";
import { Modal } from "../Day/Modal";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  const { today } = useNow();
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);

  const dayHasPassed = day.valueOf() < today.valueOf();
  return (
    <GridCell {...restProps}>
      <InnerCircle
        today={today.valueOf() === day.valueOf()}
        dayHasPassed={dayHasPassed}
        onClick={!dayHasPassed ? openModal : undefined}
      >
        {day.getDate()}
      </InnerCircle>
      <Modal day={day} displayModal={displayModal} closeModal={closeModal} />
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

const InnerCircle = styled(Flex)<{ today: boolean; dayHasPassed: boolean }>`
  height: 60%;
  width: 60%;
  border-radius: 50%;
  border: ${({ today }) => (today ? "solid 1px" : null)};
  color: ${({ dayHasPassed }) => (dayHasPassed ? "rgba(0, 0, 0, 0.3)" : null)};
  border-color: gray;
  &:hover {
    background-color: ${({ dayHasPassed }) => (dayHasPassed ? null : "gray")};
    color: ${({ dayHasPassed }) => (dayHasPassed ? null : " white")};
  }
  &:active {
    background-color: ${({ dayHasPassed }) => (dayHasPassed ? null : "gray")};
    color: white;
  }
  transition: 0.15s;
  cursor: pointer;
`;
