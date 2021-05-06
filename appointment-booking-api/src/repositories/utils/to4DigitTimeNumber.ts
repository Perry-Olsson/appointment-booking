export const to4DigitTimeNumber = (timeString: string) =>
  Number(timeString.slice(0, 2)) * 100 + Number(timeString.slice(3));
