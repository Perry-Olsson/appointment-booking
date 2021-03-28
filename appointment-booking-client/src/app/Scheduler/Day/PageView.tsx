import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components";
import { BackButton } from "../../../components/BackButton";
import { device } from "../../../components/device";
import { dayString, months } from "../../../constants";
import { useDimensions } from "../../../hooks";
import { Appointment } from "../../../types";

export const PageView: React.FC<DayProps> = ({ day, appointments }) => {
  console.log(appointments)
  const { width } = useDimensions()
  return  (
      <Container>
        <StyledBackButton />
        <h2>{getDateString(day, width)}</h2>
      </Container>
  );
};

const getDateString = (day: Date, screenWidth: number) => {
  return device.isTabletOrSmaller(screenWidth) ? 
  `${months[day.getMonth()].slice(0, 3)}. ${day.getDate()}, ${day.getFullYear()}` 
  : `${dayString[day.getMonth()]} ${day.getMonth()}/${day.getDate()}`
}

interface DayProps {
  appointments: Appointment[];
  day: Date;
}

const Container = styled(Flex)`
  padding: 1rem;
`

const StyledBackButton = styled(BackButton)`
  position: absolute;
  left: 0;
  margin: 1rem;
  cursor: pointer;
`;
