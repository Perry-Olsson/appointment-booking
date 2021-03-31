import { monthString } from "../../../../../../constants";

export const getMonthString = (month: Date[]) => {
  return `${monthString[month[0].getMonth()]} ${month[0].getFullYear()}`;
};
