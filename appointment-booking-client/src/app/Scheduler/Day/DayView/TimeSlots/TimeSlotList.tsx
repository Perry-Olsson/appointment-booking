import { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { ServiceDay } from "../../../../../types";
import { useAppointments } from "../../context";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = ({
  timeSlots,
  serviceHours,
  day,
}) => {
  const appointments = useAppointments();
  const [now, setNow] = useState(new Date());
  const isToday = day.isToday();

  useEffect(() => {
    if (isToday) {
      const id = setInterval(() => {
        const newNow = new Date();
        if (
          newNow.getMinutes() > now.getMinutes() ||
          (now.getMinutes() === 59 && newNow.getMinutes() === 0)
        ) {
          setNow(newNow);
        }
      }, 1000);
      return () => clearInterval(id);
    }
  });

  if (serviceHours.isClosed) return <div>Sorry we're closed</div>;

  let i = 0;
  return (
    <Container isToday={isToday}>
      {isToday ? (
        <NowMarker now={now}>
          <NowTimeString>{now.getTimeString()}</NowTimeString>
        </NowMarker>
      ) : null}
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
  border-top: solid 2px;
  height: 0px;
  color: ${({ theme }) => theme.colors.primary};
`;

const NowTimeString = styled.div`
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

const Container = styled.div<{ isToday: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  bottom: ${({ isToday }) => (isToday ? "2px" : 0)};
  @media (max-width: ${device.desktop.pixels}) {
    grid-column: 1 / 4;
    max-width: ${device.tablet.pixels};
    margin: auto;
  }
`;

export interface TimeSlotsProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
  day: Date;
}
