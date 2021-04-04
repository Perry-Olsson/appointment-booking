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
