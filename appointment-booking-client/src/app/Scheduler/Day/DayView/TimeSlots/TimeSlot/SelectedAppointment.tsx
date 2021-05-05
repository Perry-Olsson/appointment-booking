import styled from "styled-components";
import { Procedure, Provider } from "../../../../../../types";
import { isStartOfAppointment, isEndOfAppointment } from "./utils";

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
  if (provider && procedure && selectedAppointment) {
    const isFirstSlot = isStartOfAppointment(
      timeSlot.valueOf(),
      selectedAppointment.start.valueOf()
    );
    return (
      <Container
        isFirstSlot={isFirstSlot}
        isLastSlot={isEndOfAppointment(
          timeSlot.valueOf(),
          selectedAppointment.end.valueOf()
        )}
        timeSlot={timeSlot}
        selectedAppointment={selectedAppointment}
      >
        {children}
      </Container>
    );
  }
  return <>{children}</>;
};

export const Container = styled.div<ContainerProps>`
  height: 100%;
  background-color: ${({ theme, timeSlot, selectedAppointment }) => {
    return timeSlot.valueOf() >= selectedAppointment.start.valueOf() &&
      timeSlot.valueOf() < selectedAppointment.end.valueOf()
      ? theme.colors.primaryLightFaded
      : null;
  }};
  border-top-left-radius: ${({ theme, isFirstSlot }) =>
    isFirstSlot ? theme.dayView.appointmentBlockRadius : null};
  border-top-right-radius: ${({ theme, isFirstSlot }) =>
    isFirstSlot ? theme.dayView.appointmentBlockRadius : null};
  border-bottom-left-radius: ${({ theme, isLastSlot }) =>
    isLastSlot ? theme.dayView.appointmentBlockRadius : null};
  border-bottom-right-radius: ${({ theme, isLastSlot }) =>
    isLastSlot ? theme.dayView.appointmentBlockRadius : null};
`;

interface ContainerProps {
  isFirstSlot: boolean;
  isLastSlot: boolean;
  timeSlot: Date;
  selectedAppointment: { start: Date; end: Date };
}
