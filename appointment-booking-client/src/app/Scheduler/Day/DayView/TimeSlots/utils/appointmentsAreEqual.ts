import { TimeSlotsProps } from "../TimeSlotList";

export const appointmentsAreEqual = (
  { appointments: prev }: TimeSlotsProps,
  { appointments: next }: TimeSlotsProps
) => {
  if (!prev || !next) return false;
  if (prev.length !== next.length) return false;
  return prev.reduce<boolean>((isEqual, appointment, i) => {
    return !isEqual || appointment.id !== next[i].id ? false : true;
  }, true);
};
