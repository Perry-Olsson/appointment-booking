import { Appointment } from "../../../../../../types";

export const appointmentsAreEqual = (
  { appointments: prev }: any,
  { appointments: next }: any
) => {
  if (!prev || !next) return false;
  if (prev.length !== next.length) return false;
  return prev.reduce(
    (isEqual: boolean, appointment: Appointment, i: number) => {
      return !isEqual || appointment.id !== next[i].id ? false : true;
    },
    true
  );
};
