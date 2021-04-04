import { memo, useMemo } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { Appointment } from "../../../../../types";
import { TimeSlot } from "./TimeSlot";
import { appointmentsAreEqual, computeTimeSlots } from "./utils";

export const TimeSlotList: React.FC<TimeSlotsProps> = memo(
  ({ day, appointments }) => {
    const timeSlots = useMemo(() => computeTimeSlots(day), [day]);

    let index = 0;
    return (
      <Container>
        {timeSlots.map(slot => {
          if (slot.valueOf() === appointments[index]?.end.valueOf()) index++;
          return (
            <TimeSlot
              key={slot.valueOf()}
              timeSlot={slot}
              appointment={appointments[index]}
            />
          );
        })}
      </Container>
    );
  },
  appointmentsAreEqual
);

export interface TimeSlotsProps {
  day: Date;
  appointments: Appointment[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  @media (max-width: ${device.desktop.pixels}) {
    grid-column: 1 / 4;
    max-width: ${device.tablet.pixels};
    margin: auto;
  }
`;
