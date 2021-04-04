import styled from "styled-components";
import { GrayedOut } from "./GrayedOut";
import { Appointment } from "../../../../../types";

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  appointment,
}) => {
  const isOnHour = timeSlot.getMinutes() === 0;

  return (
    <Container isOnHour={isOnHour}>
      <GrayedOut
        timeSlotValue={timeSlot.valueOf()}
        timestampValue={appointment?.timestamp.valueOf() || 0}
        endValue={appointment?.end.valueOf() || 0}
      >
        {isOnHour ? <TimeString>{getTimeString(timeSlot)}</TimeString> : null}
      </GrayedOut>
    </Container>
  );
};

const Container = styled.div<{ isOnHour: boolean }>`
  border-top: solid 1px;
  border-color: ${({ theme, isOnHour }) =>
    isOnHour ? theme.colors.gray : theme.colors.lightGray};
  width: 100%;
  height: 1.7rem;
`;

interface TimeSlotProps {
  timeSlot: Date;
  appointment: Appointment | undefined;
}

const TimeString = styled.div`
  margin-left: 5px;
`;

const getTimeString = (timeSlot: Date) => {
  const localeTimestring = timeSlot.toLocaleTimeString();
  const hours = timeSlot.getHours();
  return `${
    hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  } ${localeTimestring.slice(localeTimestring.length - 3)}`;
};
