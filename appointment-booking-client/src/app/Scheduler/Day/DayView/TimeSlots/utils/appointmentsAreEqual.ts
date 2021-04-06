import { TimeSlotsProps } from "..";
import { DayViewProps } from "../..";

export const appointmentsAreEqual = (
  { appointments: prev }: TimeSlotsProps | DayViewProps,
  { appointments: next }: TimeSlotsProps | DayViewProps
) => {
  if (prev.length !== next.length) return false;
  return prev.reduce<boolean>((isEqual, appointment, i) => {
    return !isEqual || appointment.id !== next[i].id ? false : true;
  }, true);
};
