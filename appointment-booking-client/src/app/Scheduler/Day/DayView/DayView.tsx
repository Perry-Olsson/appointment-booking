import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { Appointment } from "../../../../types";
import { Header } from "./Header";
import { TimeSlotList } from "./TimeSlots";

export const DayView: React.FC<DayProps> = ({ day, appointments }) => {
  return (
    <Container>
      <Header day={day} />
      <TimeSlotList day={day} />
    </Container>
  );
};

interface DayProps {
  appointments: Appointment[];
  day: Date;
}

const Container = styled(Flex)`
  padding: 1rem 0;
  flex-direction: column;
`;
