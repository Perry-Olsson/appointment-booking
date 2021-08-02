import { FC } from "react";
import styled from "styled-components";
import { isStartOfAppointment, isEndOfAppointment } from "./utils";

interface GrayedOutProps {
  isUsersAppointment: boolean;
  timeSlotValue: number;
  timestampValue: number;
  endValue: number;
}

export const GrayedOut: FC<GrayedOutProps> = props => {
  return (
    <Container
      isUsersAppointment={props.isUsersAppointment}
      slotIsTaken={slotIsTaken(props)}
      isStart={isStartOfAppointment(props.timeSlotValue, props.timestampValue)}
      isEnd={isEndOfAppointment(props.timeSlotValue, props.endValue)}
    >
      {props.children}
    </Container>
  );
};

export const Container = styled.div<ContainerProps>`
  height: 100%;
  background-color: ${({ isUsersAppointment, slotIsTaken }) => {
    if (slotIsTaken) {
      if (isUsersAppointment) return "#dcddbf";
      return "gray";
    }
    return null;
  }};
  border-top-left-radius: ${({ theme, isStart }) =>
    isStart ? theme.dayView.appointmentBlockRadius : null};
  border-top-right-radius: ${({ theme, isStart }) =>
    isStart ? theme.dayView.appointmentBlockRadius : null};
  border-bottom-left-radius: ${({ theme, isEnd }) =>
    isEnd ? theme.dayView.appointmentBlockRadius : null};
  border-bottom-right-radius: ${({ theme, isEnd }) =>
    isEnd ? theme.dayView.appointmentBlockRadius : null};
`;

interface ContainerProps {
  isUsersAppointment: boolean;
  slotIsTaken: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const slotIsTaken = ({
  timeSlotValue,
  timestampValue,
  endValue,
}: GrayedOutProps) =>
  timeSlotValue >= timestampValue && timeSlotValue < endValue ? true : false;
