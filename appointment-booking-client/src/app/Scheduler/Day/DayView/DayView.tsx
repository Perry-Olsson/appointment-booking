import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { Header } from "./Header";
import { TimeSlotList } from "./TimeSlots";

export const DayView: React.FC<DayProps> = ({ day, appointments }) => {
  return (
    <Container>
      <Header day={day} />
      <Grid>
        <MonthCard>month card todo</MonthCard>
        <TimeSlotList day={day} />
      </Grid>
    </Container>
  );
};

interface DayProps {
  appointments: Appointment[];
  day: Date;
}

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
`;

const MonthCard = styled.div`
  width: 100%;
  height: 200px;
  border: solid;
  @media (max-width: ${device.desktop.pixels}) {
    display: none;
  }
`;
