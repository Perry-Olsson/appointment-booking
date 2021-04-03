import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { TabletMobileCreateAppointment } from "../../AppointmentForm";
import { dimensionsAtom } from "../../atoms";
import { Header } from "./Header";
import { MonthCard } from "./MonthCard";
import { TimeSlotList } from "./TimeSlots";

export const DayView: React.FC<DayProps> = ({ day, appointments }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <Header day={day} />
      <Grid>
        {device.isDesktop(width) ? <MonthCard day={day} /> : null}
        <TimeSlotList day={day} appointments={appointments} />
      </Grid>
      {width < device.desktop.width ? <TabletMobileCreateAppointment /> : null}
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
  height: ${({ theme }) =>
    `${window.innerHeight - theme.dayView.headerOffset}px`};
  @media (min-width: ${device.desktop.pixels}) {
    border-top: solid 1px #90909090;
    padding-top: 20px;
  }
  @media (max-width: ${device.desktop.pixels}) {
    height: ${({ theme }) =>
      `${
        window.innerHeight -
        theme.dayView.headerOffset -
        theme.dayView.footerOffset
      }px`};
  }
`;
