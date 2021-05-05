import { FC } from "react";
import styled from "styled-components";
import { isStartOfAppointment, isEndOfAppointment } from "./utils";

interface GrayedOutProps {
  timeSlotValue: number;
  timestampValue: number;
  endValue: number;
}

export const GrayedOut: FC<GrayedOutProps> = props => {
  return (
    <Container
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
  background-color: ${({ slotIsTaken }) => (slotIsTaken ? "gray" : null)};
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
