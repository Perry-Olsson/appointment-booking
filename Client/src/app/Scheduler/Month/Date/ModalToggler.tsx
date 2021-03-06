import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { useNow } from "../../../../context";

export const ModalToggler: React.FC<ModalTogglerProps> = ({
  day,
  openModal,
}) => {
  const { today } = useNow();
  const dayHasPassed = day.valueOf() < today.valueOf();

  return (
    <Container
      today={today.valueOf() === day.valueOf()}
      dayHasPassed={dayHasPassed}
      onClick={!dayHasPassed ? openModal : undefined}
    >
      <b>{day.getDate()}</b>
    </Container>
  );
};

interface ModalTogglerProps {
  day: Date;
  openModal: () => void;
}

const Container = styled(Flex)<{ today: boolean; dayHasPassed: boolean }>`
  color: ${({ dayHasPassed }) => (dayHasPassed ? "rgba(0, 0, 0, 0.3)" : null)};
  @media (min-width: ${device.tablet.pixels}) {
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0.1rem;
    &:hover {
      background-color: ${({ theme, dayHasPassed }) =>
        dayHasPassed ? null : `${theme.colors.primary}20`};
    }
  }
  @media (max-width: ${device.tablet.pixels}) {
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
