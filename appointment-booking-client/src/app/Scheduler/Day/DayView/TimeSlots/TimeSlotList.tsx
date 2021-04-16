import { memo } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { Appointment, ServiceDay } from "../../../../../types";
import { TimeSlot } from "./TimeSlot";
import { appointmentsAreEqual } from "./utils/appointmentsAreEqual";

export const TimeSlotList: React.FC<TimeSlotsProps> = memo(
  ({ timeSlots, serviceHours, appointments }) => {
    if (serviceHours.isClosed) return <div>Sorry we're closed</div>;

    let i = 0;
    return (
      <Container>
        {timeSlots.map(slot => {
          if (
            appointments &&
            i < appointments.length - 1 &&
            slot.valueOf() === appointments[i].end.valueOf()
          )
            i++;
          return (
            <TimeSlot
              key={slot.valueOf()}
              timeSlot={slot}
              serviceHours={serviceHours}
              appointment={appointments && appointments[i]}
            />
          );
        })}
      </Container>
    );
  },
  (prev, next) =>
    prev.serviceHours.isClosed === next.serviceHours.isClosed &&
    appointmentsAreEqual(prev, next)
);

export interface TimeSlotsProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
  appointments: Appointment[] | undefined;
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
