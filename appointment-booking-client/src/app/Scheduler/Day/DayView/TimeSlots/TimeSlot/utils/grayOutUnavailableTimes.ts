import { Provider, ServiceDay } from "../../../../../../../types";
import { to4DigitTimeNumber } from "../../../../../utils";
import { isInService } from "../../../../../utils/isInService";

interface IsGrayedOutArgs {
  provider: Provider | undefined;
  timeSlot: Date;
  serviceHours: ServiceDay;
}

export const isAvailableTime = ({
  provider,
  timeSlot,
  serviceHours,
}: IsGrayedOutArgs) => {
  if (provider) {
    if (isUnavailableTime(timeSlot, provider)) return false;
    return true;
  } else {
    if (isInService(timeSlot, serviceHours)) return true;
    return false;
  }
};

export const isUnavailableTime = (
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
