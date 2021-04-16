import styled from "styled-components";
import { QUARTER_HOUR } from "../../../../../constants";

interface GrayedOutProps {
  timeSlotValue: number | undefined;
  timestampValue: number | undefined;
  endValue: number | undefined;
}

export const GrayedOut = styled.div<GrayedOutProps>`
  height: 100%;
  margin: 0 2px;
  background-color: ${({ theme, timeSlotValue, timestampValue, endValue }) =>
    timeSlotValue &&
    timestampValue &&
    endValue &&
    timeSlotValue >= timestampValue &&
    timeSlotValue < endValue
      ? theme.dayView.appointmentBlockColor
      : null};
  border-top-left-radius: ${({ theme, timeSlotValue, timestampValue }) =>
    timeSlotValue === timestampValue
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-top-right-radius: ${({ theme, timeSlotValue, timestampValue }) =>
    timeSlotValue === timestampValue
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-bottom-left-radius: ${({ theme, timeSlotValue, endValue }) =>
    endValue && timeSlotValue === endValue - QUARTER_HOUR
      ? theme.dayView.appointmentBlockRadius
      : null};
  border-bottom-right-radius: ${({ theme, timeSlotValue, endValue }) =>
    endValue && timeSlotValue === endValue - QUARTER_HOUR
      ? theme.dayView.appointmentBlockRadius
      : null};
`;
