import { ServiceDay } from "../../../types";
import { to4DigitTimeNumber } from "./to4DigitTimeNumber";

export const isInService = (
  timeSlot: Date,
  serviceHours: ServiceDay
): boolean => {
  const open = to4DigitTimeNumber(serviceHours.open);
  const close = to4DigitTimeNumber(serviceHours.close);
  const time = timeSlot.get4DigitTimeNumber();

  if (time < open || time >= close) return false;
  else return true;
};
