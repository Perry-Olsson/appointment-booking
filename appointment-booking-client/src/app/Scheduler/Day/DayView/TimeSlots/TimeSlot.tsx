import { useAtom } from "jotai";
import styled from "styled-components";
import { Appointment, Provider, ServiceDay } from "../../../../../types";
import { providerAtom } from "../../../atoms";
import { to4DigitTimeNumber } from "../../../utils";
import { GrayedOut } from "./GrayedOut";

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  serviceHours,
  appointment,
}) => {
  const [provider] = useAtom(providerAtom);
  const isOnHour = timeSlot.getMinutes() === 0;

  return (
    <Container
      isOnHour={isOnHour}
      timeSlot={timeSlot}
      serviceHours={serviceHours}
      provider={provider}
    >
      <GrayedOut
        timeSlotValue={timeSlot.valueOf()}
        timestampValue={appointment ? appointment.timestamp.valueOf() : 0}
        endValue={appointment ? appointment.end.valueOf() : 0}
      >
        {isOnHour ? <TimeString>{getTimeString(timeSlot)}</TimeString> : null}
      </GrayedOut>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  border-top: solid 1px;
  border-color: ${({ theme, isOnHour }) =>
    isOnHour ? theme.colors.gray : theme.colors.lightGray};
  width: 100%;
  height: 1.7rem;
  background-color: ${({ theme, timeSlot, serviceHours, provider }) => {
    if (provider) {
      if (grayOutUnavailableTime(timeSlot, provider))
        return theme.colors.lightGray;
      return null;
    } else {
      if (isInService(timeSlot, serviceHours)) return null;
      return theme.colors.lightGray;
    }
  }};
`;

interface ContainerProps {
  isOnHour: boolean;
  timeSlot: Date;
  serviceHours: ServiceDay;
  provider: Provider | undefined;
}

interface TimeSlotProps {
  timeSlot: Date;
  serviceHours: ServiceDay;
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

const grayOutUnavailableTime = (
  timeSlot: Date,
  provider: Provider
): boolean => {
  const time = timeSlot.get4DigitTimeNumber();
  const schedule = provider.schedule[timeSlot.getDayString()];
  if (schedule.length === 0) return true;
  for (let i = 0; i < schedule.length; i++) {
    const scheduleBoundry = to4DigitTimeNumber(schedule[i]);
    if (time < scheduleBoundry) {
      return i % 2 === 0 ? true : false;
    } else {
      if (i === schedule.length - 1) return true;
    }
  }
  return false;
};

const isInService = (timeSlot: Date, serviceHours: ServiceDay): boolean => {
  const open = to4DigitTimeNumber(serviceHours.open);
  const close = to4DigitTimeNumber(serviceHours.close);
  const time = timeSlot.get4DigitTimeNumber();

  if (time < open || time >= close) return false;
  else return true;
};
