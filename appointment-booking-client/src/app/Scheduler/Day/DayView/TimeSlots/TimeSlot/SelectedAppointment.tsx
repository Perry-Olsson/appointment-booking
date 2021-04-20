import styled from "styled-components";
import { ONE_MINUTE } from "../../../../../../constants";
import { Procedure, Provider } from "../../../../../../types";

interface SelectedAppointmentProps {
  timeSlot: Date;
  selectedAppointment: { start: Date; end: Date } | null;
  provider: Provider | undefined;
  procedure: Procedure | undefined;
}

export const SelectedAppointment: React.FC<SelectedAppointmentProps> = ({
  children,
  provider,
  procedure,
  selectedAppointment,
  timeSlot,
}) => {
  if (provider && procedure && selectedAppointment)
    return (
      <Container timeSlot={timeSlot} selectedAppointment={selectedAppointment}>
        {children}
      </Container>
    );
  return <Margin>{children}</Margin>;
};

export const Container = styled.div<ContainerProps>`
  height: 100%;
  margin: 0 2px;
  background-color: ${({ theme, timeSlot, selectedAppointment }) => {
    return timeSlot.valueOf() >= selectedAppointment.start.valueOf() &&
      timeSlot.valueOf() < selectedAppointment.end.valueOf()
      ? theme.colors.primaryLightFaded
      : null;
  }};
  border-top-left-radius: ${({ theme, timeSlot, selectedAppointment }) =>
    isFirstTimeSlot(timeSlot, selectedAppointment.start)
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-top-right-radius: ${({ theme, timeSlot, selectedAppointment }) =>
    isFirstTimeSlot(timeSlot, selectedAppointment.start)
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-bottom-left-radius: ${({ theme, timeSlot, selectedAppointment }) =>
    isLastTimeSlot(timeSlot, selectedAppointment.end)
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-bottom-right-radius: ${({ theme, timeSlot, selectedAppointment }) =>
    isLastTimeSlot(timeSlot, selectedAppointment.end)
      ? theme.dayView.appointmentBlockRadius
      : null};
`;

const isFirstTimeSlot = (timeSlot: Date, start: Date) =>
  timeSlot.valueOf() === start.valueOf() ? true : false;

const isLastTimeSlot = (timeSlot: Date, end: Date) =>
  timeSlot.valueOf() === end.valueOf() - ONE_MINUTE * 15 ? true : false;

interface ContainerProps {
  timeSlot: Date;
  selectedAppointment: { start: Date; end: Date };
}

const Margin = styled.div`
  height: 100%;
  margin: 0 2px;
`;
