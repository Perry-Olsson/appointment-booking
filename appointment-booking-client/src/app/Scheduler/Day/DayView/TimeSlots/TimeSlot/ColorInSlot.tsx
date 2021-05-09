import styled from "styled-components";
import { useGetUser } from "../../../../../../context";
import { Appointment, Procedure, Provider } from "../../../../../../types";
import { GrayedOut } from "./GrayedOut";
import { SelectedAppointment } from "./SelectedAppointment";
import { getSelectedAppointment, isStartOfAppointment } from "./utils";

export const ColorInSlot: React.FC<ColorInSlotProps> = ({
  timeSlot,
  provider,
  procedure,
  appointment,
  time,
}) => {
  const user = useGetUser();
  const isOnHour = timeSlot.getMinutes() === 0;
  const selectedAppointment = getSelectedAppointment(time, procedure);

  const userAppointment =
    user &&
    appointment &&
    user !== "loading" &&
    user.appointments.find(a => a.id === appointment!.id);

  return (
    <Margin>
      <SelectedAppointment
        timeSlot={timeSlot}
        selectedAppointment={selectedAppointment}
        provider={provider}
        procedure={procedure}
      >
        <GrayedOut
          isUsersAppointment={userAppointment ? true : false}
          timeSlotValue={timeSlot.valueOf()}
          timestampValue={appointment ? appointment.timestamp.valueOf() : 0}
          endValue={appointment ? appointment.end.valueOf() : 0}
        >
          <TextContainer>
            {isOnHour ? (
              <TimeString>{timeSlot.getTimeSlotString()}</TimeString>
            ) : null}
            {selectedAppointment &&
            isStartOfAppointment(
              timeSlot.valueOf(),
              selectedAppointment.start.valueOf()
            ) ? (
              <AppointmentText isOnHour={isOnHour}>
                {procedure!.name} with {provider!.firstName}{" "}
                {provider!.lastName}
              </AppointmentText>
            ) : null}
            {userAppointment &&
            provider &&
            appointment &&
            isStartOfAppointment(
              timeSlot.valueOf(),
              appointment.timestamp.valueOf()
            ) ? (
              <AppointmentText isOnHour={isOnHour}>
                Your {userAppointment.procedureId} with {provider.firstName}{" "}
                {provider.lastName}
              </AppointmentText>
            ) : null}
          </TextContainer>
        </GrayedOut>
      </SelectedAppointment>
    </Margin>
  );
};

const Margin = styled.div`
  height: 100%;
  margin: 0 2px;
`;

const TextContainer = styled.div`
  display: flex;
`;

const TimeString = styled.div`
  padding-left: 4px;
  width: 60px;
`;

const AppointmentText = styled.span<{ isOnHour: boolean }>`
  margin: auto;
  position: relative;
  right: ${({ isOnHour }) => (isOnHour ? "30px" : 0)};
`;

interface ColorInSlotProps {
  timeSlot: Date;
  provider: Provider | undefined;
  procedure: Procedure | undefined;
  appointment: Appointment | undefined;
  time: Date | undefined;
}
