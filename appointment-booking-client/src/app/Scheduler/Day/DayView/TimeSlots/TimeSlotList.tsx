import { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { ServiceDay } from "../../../../../types";
import { useAppointments } from "../../context";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = ({
  timeSlots,
  serviceHours,
}) => {
  const appointments = useAppointments();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      const newNow = new Date();
      if (
        newNow.getMinutes() > now.getMinutes() ||
        (now.getMinutes() === 59 && newNow.getMinutes() === 0)
      ) {
        setNow(newNow);
      }
    }, 1000);
  });

  if (serviceHours.isClosed) return <div>Sorry we're closed</div>;

  let i = 0;
  return (
    <Container>
      <NowMarker now={now}>
        <NowTimeString now={now}>{now.getTimeString()}</NowTimeString>
      </NowMarker>
      {timeSlots.map(slot => {
        if (
          i < appointments.length - 1 &&
          slot.valueOf() === appointments[i].end.valueOf()
        ) {
          i++;
        }

        return (
          <TimeSlot
            key={slot.valueOf()}
            timeSlot={slot}
            serviceHours={serviceHours}
            appointment={appointments.length > 0 ? appointments[i] : undefined}
          />
        );
      })}
    </Container>
  );
};

const NowMarker = styled.div<{ now: Date }>`
  position: relative;
  top: ${({ now }) =>
    `${1.7 * now.getHours() * 4 + 1.7 * (now.getMinutes() / 60)}rem`};
  border-top: solid;
  height: 0px;
  color: ${({ theme }) => theme.colors.primary};
`;

const NowTimeString = styled.div<{ now: Date }>`
  position: absolute;
  color: black;
  right: 5px;
  bottom: 10px;
  background-color: #eeeeee;
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

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

export interface TimeSlotsProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
}
