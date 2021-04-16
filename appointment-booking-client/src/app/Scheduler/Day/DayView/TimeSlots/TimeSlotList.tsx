import { memo } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { ServiceDay } from "../../../../../types";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = memo(
  ({ timeSlots, serviceHours }) => {
    if (serviceHours.isClosed) return <div>Sorry we're closed</div>;

    return (
      <Container>
        {timeSlots.map(slot => {
          return (
            <TimeSlot
              key={slot.valueOf()}
              timeSlot={slot}
              serviceHours={serviceHours}
            />
          );
        })}
      </Container>
    );
  },
  (prev, next) => prev.serviceHours.isClosed === next.serviceHours.isClosed
);

export interface TimeSlotsProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
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
