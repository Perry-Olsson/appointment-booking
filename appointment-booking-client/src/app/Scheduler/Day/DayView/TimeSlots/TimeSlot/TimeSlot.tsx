import { useAtom } from "jotai";
import { SetStateAction } from "jotai/core/types";
import styled from "styled-components";
import {
  Appointment,
  Procedure,
  Provider,
  ServiceDay,
} from "../../../../../../types";
import {
  AppointmentBoundries,
  selectedAppointmentAtom,
  procedureAtom,
  providerAtom,
} from "../../../../atoms";
import { isInService } from "../../../../utils/isInService";
import { SelectedAppointment } from "./SelectedAppointment";
import { GrayedOut } from "./GrayedOut";
import { appointmentFitsSlot, grayOutUnavailableTime } from "./utils";
import { useFormApi } from "../../../context";
import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../../../../AppointmentForm/types";

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  serviceHours,
  appointment,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useAtom(
    selectedAppointmentAtom
  );
  const [provider] = useAtom(providerAtom);
  const [procedure] = useAtom(procedureAtom);
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
          selectedAppointment,
          setSelectedAppointment,
          setValue,
          appointment,
        })
      }
    >
      <Margin>
        <SelectedAppointment
          timeSlot={timeSlot}
          selectedAppointment={selectedAppointment}
          provider={provider}
          procedure={procedure}
        >
          <GrayedOut
            timeSlotValue={timeSlot.valueOf()}
            timestampValue={appointment ? appointment.timestamp.valueOf() : 0}
            endValue={appointment ? appointment.end.valueOf() : 0}
          >
            {isOnHour ? (
              <TimeString>{timeSlot.getTimeSlotString()}</TimeString>
            ) : null}
          </GrayedOut>
        </SelectedAppointment>
      </Margin>
    </Container>
  );
};

const handleClick = ({
  provider,
  procedure,
  timeSlot,
  selectedAppointment,
  setSelectedAppointment,
  setValue,
  appointment,
}: HandleClickArgs) => {
  if (provider && procedure) {
    if (selectedAppointment?.start === timeSlot) {
      setValue("time", "");
      setSelectedAppointment(null);
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
      setSelectedAppointment({
        start: timeSlot,
        end: appointmentEnd,
      });
    }
  }
};

interface HandleClickArgs {
  provider: Provider | undefined;
  procedure: Procedure | undefined;
  timeSlot: Date;
  setValue: UseFormSetValue<FormValues>;
  selectedAppointment: AppointmentBoundries | null;
  appointment: Appointment | undefined;
  setSelectedAppointment: (
    update: SetStateAction<AppointmentBoundries | null>
  ) => void | Promise<void>;
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

const TimeString = styled.div`
  margin-left: 5px;
`;

const Margin = styled.div`
  height: 100%;
  margin: 0 2px;
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
