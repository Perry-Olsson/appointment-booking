import { QUARTER_HOUR } from "../../../../../../../constants";

export const isStartOfAppointment = (
  timeSlotValue: number,
  timestampValue: number
) => (timeSlotValue === timestampValue ? true : false);

export const isEndOfAppointment = (timeSlotValue: number, endValue: number) =>
  endValue && timeSlotValue === endValue - QUARTER_HOUR ? true : false;
