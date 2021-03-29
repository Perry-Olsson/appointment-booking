import { useMemo } from "react";
import styled from "styled-components";
import { Flex } from "../../../../../components";
import { QUARTER_HOUR } from "../../../../../constants";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = ({ day }) => {
  const timeSlots = useMemo(() => computeTimeSlots(day), []);
  return (
    <Container>
      {timeSlots.map(slot => (
        <TimeSlot key={slot.valueOf()} timeSlot={slot} />
      ))}
    </Container>
  );
};

const computeTimeSlots = (day: Date): Date[] => {
  const timeSlots: Date[] = [];
  let currentTime = day;
  while (currentTime.getDate() === day.getDate()) {
    console.log(currentTime);
    timeSlots.push(currentTime);
    currentTime = new Date(currentTime.valueOf() + QUARTER_HOUR);
  }
  return timeSlots;
};

const Container = styled(Flex)`
  flex-direction: column;
  border-bottom: 1px solid;
  margin: 1rem 0;
  width: 100%;
`;

interface TimeSlotsProps {
  day: Date;
}
