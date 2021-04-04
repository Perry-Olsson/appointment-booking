import { TimeSlotsProps } from "..";
import { QUARTER_HOUR } from "../../../../../../constants";

export const computeTimeSlots = (day: Date): Date[] => {
  const timeSlots: Date[] = [];
  let currentTime = day;
  while (currentTime.getDate() === day.getDate()) {
    timeSlots.push(currentTime);
    currentTime = new Date(currentTime.valueOf() + QUARTER_HOUR);
  }
  return timeSlots;
};

export const appointmentsAreEqual = (
  { appointments: prev }: TimeSlotsProps,
  { appointments: next }: TimeSlotsProps
) => {
  if (prev.length !== next.length) return false;
  return prev.reduce<boolean>((isEqual, appointment, i) => {
    return !isEqual || appointment.id !== next[i].id ? false : true;
  }, true);
};
