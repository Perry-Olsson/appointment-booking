import styled from "styled-components";
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
  const isOnHour = timeSlot.getMinutes() === 0;
  const selectedAppointment = getSelectedAppointment(time, procedure);

  return (
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
          <TextContainer>
            {isOnHour ? (
              <TimeString>{timeSlot.getTimeSlotString()}</TimeString>
            ) : null}
            {selectedAppointment &&
              isStartOfAppointment(
                timeSlot.valueOf(),
                selectedAppointment.start.valueOf()
              ) && (
                <AppointmentText isOnHour={isOnHour}>
                  {procedure!.name} with {provider!.firstName}{" "}
                  {provider!.lastName}
                </AppointmentText>
              )}
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
