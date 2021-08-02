import styled from "styled-components";
import { Appointment, ServiceDay } from "../../../../../../types";
import { isAvailableTime, selectedAppointmentFits } from "./utils";
import { useFormApi } from "../../../../context";
import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../../../../AppointmentForm/types";
import {
  useWatchProcedure,
  useWatchProvider,
  useWatchTime,
} from "../../../../hooks";
import { ColorInSlot } from "./ColorInSlot";
import { theme } from "../../../../../../components";

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
  const appointmentFits = selectedAppointmentFits({
    procedure,
    provider,
    time,
    timeSlot,
    appointment,
  });

  return (
    <Container
      isOnHour={isOnHour}
      isAvailableTime={isAvailableTime({ provider, timeSlot, serviceHours })}
      appointmentFits={appointmentFits}
      onClick={
        appointmentFits !== false
          ? () =>
              handleClick({
                appointmentFits,
                timeSlot,
                setValue,
              })
          : undefined
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
  timeSlot,
  appointmentFits,
  setValue,
}: HandleClickArgs) => {
  if (appointmentFits === undefined) setValue("timestamp", "");
  else setValue("timestamp", timeSlot.toJSON());
};

interface HandleClickArgs {
  appointmentFits: boolean | undefined;
  timeSlot: Date;
  setValue: UseFormSetValue<FormValues>;
}

const Container = styled.div<ContainerProps>`
  border-top: solid 1px;
  border-color: ${({ theme, isOnHour }) =>
    isOnHour ? theme.colors.gray : theme.colors.lightGray};
  width: 100%;
  height: 1.7rem;
  background-color: ${({ isAvailableTime }) =>
    !isAvailableTime ? theme.colors.lightGray : null};
  cursor: ${({ appointmentFits }) =>
    appointmentFits !== false ? "pointer" : null};
`;

interface ContainerProps {
  isOnHour: boolean;
  isAvailableTime: boolean;
  appointmentFits: boolean | undefined;
}

interface TimeSlotProps {
  timeSlot: Date;
  serviceHours: ServiceDay;
  appointment: Appointment | undefined;
}
