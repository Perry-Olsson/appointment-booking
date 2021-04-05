import { useAtom } from "jotai";
import React, { memo } from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { AppointmentForm } from "../../AppointmentForm";
import { dimensionsAtom } from "../../atoms";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MonthCard } from "./MonthCard";
import { TimeSlotList } from "./TimeSlots";

export const DayView: React.FC<DayProps> = memo(
  ({ day, appointments }) => {
    const [{ width }] = useAtom(dimensionsAtom);

    const isDesktop = device.isDesktop(width);
    return (
      <Container>
        <Header day={day} />
        <Grid>
          {isDesktop ? <MonthCard day={day} /> : null}
          <TimeSlotList day={day} appointments={appointments} />
          {isDesktop ? <AppointmentForm /> : null}
        </Grid>
        {device.isNotWideScreen(width) ? <Footer day={day} /> : null}
      </Container>
    );
  },
  (prev, next) =>
    prev.day.valueOf() === next.day.valueOf() &&
    prev.appointments === next.appointments
);

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
