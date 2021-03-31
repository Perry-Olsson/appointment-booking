import { DayProps } from "../Day/type";

export const isDayEqual = (prev: DayProps, next: DayProps): boolean => {
  return prev.day.valueOf() === next.day.valueOf();
};
