import styled from "styled-components";
import {
  Appointment,
  Procedure,
  Provider,
  ServiceDay,
} from "../../../../../../types";
import { isInService } from "../../../../utils/isInService";
import {
  appointmentFitsSlot,
  getSelectedAppointment,
  grayOutUnavailableTime,
} from "./utils";
import { useFormApi } from "../../../context";
import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../../../../AppointmentForm/types";
import {
  useWatchProcedure,
  useWatchProvider,
  useWatchTime,
} from "../../../../hooks";
import { ColorInSlot } from "./ColorInSlot";

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  serviceHours,
  appointment,
}) => {
  const provider = useWatchProvider();
  const procedure = useWatchProcedure();
  const time = useWatchTime();
  const { setValue } = useFormApi();
  const isOnHour = timeSlot.getMinutes() === 0;

  return (
    <Container
      isOnHour={isOnHour}
      timeSlot={timeSlot}
      serviceHours={serviceHours}
      provider={provider}
      onClick={() =>
        handleClick({
          provider,
          procedure,
          timeSlot,
          time,
          setValue,
          appointment,
        })
      }
    >
      <ColorInSlot
        appointment={appointment}
        timeSlot={timeSlot}
        time={time}
        provider={provider}
        procedure={procedure}
      />
    </Container>
  );
};

const handleClick = ({
  provider,
  procedure,
  timeSlot,
  time,
  setValue,
  appointment,
}: HandleClickArgs) => {
  if (provider && procedure) {
    const selectedAppointment = getSelectedAppointment(time, procedure);
    if (selectedAppointment?.start === timeSlot) {
      setValue("time", "");
      return;
    }

    const appointmentEnd = new Date(timeSlot);
    appointmentEnd.setMinutes(timeSlot.getMinutes() + procedure.duration);

    if (appointment) {
      if (appointmentEnd > appointment.timestamp && timeSlot < appointment.end)
        return;
    }

    const schedule = provider.schedule[timeSlot.getDayString()];

    if (appointmentFitsSlot(schedule, timeSlot, appointmentEnd)) {
      setValue("time", timeSlot.toJSON());
    }
  }
};

interface HandleClickArgs {
  provider: Provider | undefined;
  procedure: Procedure | undefined;
  timeSlot: Date;
  setValue: UseFormSetValue<FormValues>;
  time: Date | undefined;
  appointment: Appointment | undefined;
}

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
