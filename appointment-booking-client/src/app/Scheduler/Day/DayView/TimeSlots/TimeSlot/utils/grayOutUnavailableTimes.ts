import { Provider } from "../../../../../../../types";
import { to4DigitTimeNumber } from "../../../../../utils";

export const grayOutUnavailableTime = (
  timeSlot: Date,
  provider: Provider
): boolean => {
  const time = timeSlot.get4DigitTimeNumber();
  const schedule = provider.schedule[timeSlot.getDayString()];
  if (schedule.length === 0) return true;
  for (let i = 0; i < schedule.length; i++) {
    const scheduleBoundry = to4DigitTimeNumber(schedule[i]);
    if (time < scheduleBoundry) {
      return i % 2 === 0 ? true : false;
    } else {
      if (i === schedule.length - 1) return true;
    }
  }
  return false;
};
