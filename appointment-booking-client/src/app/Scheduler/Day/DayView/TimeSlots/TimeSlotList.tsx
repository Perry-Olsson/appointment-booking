import { useMemo } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { QUARTER_HOUR } from "../../../../../constants";
import { useDimensions } from "../../../../../hooks";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = ({ day }) => {
  const timeSlots = useMemo(() => computeTimeSlots(day), []);
  const { height } = useDimensions();

  return (
    <Container height={height}>
      {timeSlots.map(slot => (
        <TimeSlot key={slot.valueOf()} timeSlot={slot} />
      ))}
    </Container>
  );
};

const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ theme, height }) => `${height - theme.dayView.headerOffset}px`};
  overflow-y: auto;
  @media (max-width: ${device.desktop.pixels}) {
    grid-column: 1 / 4;
    max-width: ${device.tablet.pixels};
    margin: auto;
  }
`;

interface TimeSlotsProps {
  day: Date;
}

const computeTimeSlots = (day: Date): Date[] => {
  const timeSlots: Date[] = [];
  let currentTime = day;
  while (currentTime.getDate() === day.getDate()) {
    timeSlots.push(currentTime);
    currentTime = new Date(currentTime.valueOf() + QUARTER_HOUR);
  }
  return timeSlots;
};
