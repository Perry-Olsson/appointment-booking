import { FC } from "react";
import styled from "styled-components";
import { QUARTER_HOUR } from "../../../../../../constants";

interface GrayedOutProps {
  timeSlotValue: number;
  timestampValue: number;
  endValue: number;
}

export const GrayedOut: FC<GrayedOutProps> = props => {
  return (
    <Container
      slotIsTaken={slotIsTaken(props)}
      isStart={isStartOfAppointment(props)}
      isEnd={isEndOfAppointment(props)}
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

const isStartOfAppointment = ({
  timeSlotValue,
  timestampValue,
}: GrayedOutProps) => (timeSlotValue === timestampValue ? true : false);

const isEndOfAppointment = ({ timeSlotValue, endValue }: GrayedOutProps) =>
  endValue && timeSlotValue === endValue - QUARTER_HOUR ? true : false;
