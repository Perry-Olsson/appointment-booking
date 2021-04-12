import { useAtom } from "jotai";
import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { AppointmentForm } from "../../AppointmentForm";
import { dimensionsAtom } from "../../atoms";
import { useStaticState } from "../context";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MonthCard } from "./MonthCard";
import { TimeSlotList } from "./TimeSlots";
import { appointmentsAreEqual, computeTimeSlots } from "./TimeSlots/utils";

export const DayView: React.FC<DayViewProps> = memo(
  ({ day, appointments, loading }) => {
    const [{ width }] = useAtom(dimensionsAtom);
    const { serviceHours } = useStaticState();
    const timeSlots = useMemo(() => computeTimeSlots(day), [day.valueOf()]);
    const isDesktop = device.isDesktop(width);

    if (!serviceHours.length) return <div>loading...</div>;

    return (
      <Container>
        <Header day={day} loading={loading} />
        <Grid>
          {isDesktop ? <MonthCard day={day} /> : null}
          <TimeSlotList
            timeSlots={timeSlots}
            appointments={appointments}
            serviceHours={serviceHours[day.getDay()]}
          />
          <AppointmentForm appointments={appointments} timeSlots={timeSlots} />
        </Grid>
        {!isDesktop ? <Footer day={day} /> : null}
      </Container>
    );
  },
  (prev, next) =>
    prev.day.valueOf() === next.day.valueOf() &&
    prev.loading === next.loading &&
    appointmentsAreEqual(prev, next)
);

export interface DayViewProps {
  appointments: Appointment[];
  day: Date;
  loading: boolean;
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
