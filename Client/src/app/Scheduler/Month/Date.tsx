import React, { useState } from "react";
import styled from "styled-components";

import { Flex, theme } from "../../../components";
import { device } from "../../../components/device";
import { useNow } from "../../../context";
import { Modal } from "../Day";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  if (day === null) return <GridCell {...restProps}>{null}</GridCell>;
  const { today } = useNow();
  const [renderModal, setRenderModal] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setRenderModal(true);
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
    setTimeout(() => {
      setRenderModal(false);
    }, theme.modal.transitionTime);
  };

  const dayHasPassed = day.valueOf() < today.valueOf();
  return (
    <GridCell {...restProps}>
      <InnerCircle
        today={today.valueOf() === day.valueOf()}
        dayHasPassed={dayHasPassed}
        onClick={!dayHasPassed ? openModal : undefined}
      >
        <b>{day.getDate()}</b>
      </InnerCircle>
      {renderModal ? (
        <Modal day={day} displayModal={displayModal} closeModal={closeModal} />
      ) : null}
    </GridCell>
  );
};

interface DayProps {
  day: Date | null;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)`
  @media (min-width: ${device.tablet}) {
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
  }
  height: ${({ theme }) => theme.grid.cellWidth};
  max-height: ${({ theme }) => theme.grid.cellMaxWidth};
`;

const InnerCircle = styled(Flex)<{ today: boolean; dayHasPassed: boolean }>`
  height: 100%;
  width: 100%;
  color: ${({ dayHasPassed }) => (dayHasPassed ? "rgba(0, 0, 0, 0.3)" : null)};
  &:hover {
    background-color: ${({ dayHasPassed }) =>
      dayHasPassed ? null : "#e3f2df"};
  }
  @media (min-width: ${device.tablet}) {
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0.1rem;
  }
  @media (max-width: ${device.tablet}) {
    height: 50%;
    width: 50%;
    border: ${({ today }) => (today ? "solid 1px" : null)};
    border-radius: 50%;
    border-color: gray;
    &:hover {
      background-color: ${({ dayHasPassed }) => (dayHasPassed ? null : "gray")};
      color: ${({ dayHasPassed }) => (dayHasPassed ? null : " white")};
    }
    &:active {
      background-color: ${({ dayHasPassed }) => (dayHasPassed ? null : "gray")};
    }
    transition: 0.15s;
  }
  cursor: ${({ dayHasPassed }) => (dayHasPassed ? null : "pointer")};
`;
