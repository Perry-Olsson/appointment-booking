import styled from "styled-components";
import { ServiceDay } from "../../../../../types";
import { to4DigitTimeNumber } from "../../../utils";

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  serviceHours,
}) => {
  const isOnHour = timeSlot.getMinutes() === 0;

  return (
    <Container
      isOnHour={isOnHour}
      timeSlot={timeSlot}
      serviceHours={serviceHours}
    >
      {isOnHour ? <TimeString>{getTimeString(timeSlot)}</TimeString> : null}
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  border-top: solid 1px;
  border-color: ${({ theme, isOnHour }) =>
    isOnHour ? theme.colors.gray : theme.colors.lightGray};
  width: 100%;
  height: 1.7rem;
  background-color: ${({ theme, timeSlot, serviceHours }) => {
    const open = to4DigitTimeNumber(serviceHours.open);
    const close = to4DigitTimeNumber(serviceHours.close);
    const time = timeSlot.get4DigitTimeNumber();

    if (time < open || time >= close) return theme.colors.lightGray;
    else return null;
  }};
`;

interface ContainerProps {
  isOnHour: boolean;
  timeSlot: Date;
  serviceHours: ServiceDay;
}

interface TimeSlotProps {
  timeSlot: Date;
  serviceHours: ServiceDay;
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
