export {};
declare global {
  interface Date {
    dayStrings: DayString[];
    get4DigitTimeNumber(): number;
    getDayString(): DayString;
  }
}

Date.prototype.get4DigitTimeNumber = function () {
  const utcHours = this.getUTCHours();
  if (utcHours < 7) return (24 - 7 + utcHours) * 100 + this.getMinutes();
  return (utcHours - 7) * 100 + this.getMinutes();
};

Date.prototype.getDayString = function () {
  return this.dayStrings[this.getDay()];
};

Date.prototype.dayStrings = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type DayString =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
