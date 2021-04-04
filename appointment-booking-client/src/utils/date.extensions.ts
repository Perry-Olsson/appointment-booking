export {};

declare global {
  interface Date {
    monthStrings: string[];
    dayStrings: string[];
    isValidDate(): boolean;
    getMonthString(): string;
    getDayString(): string;
    getMobileDateString(): string;
    getDesktopDateString(): string;
    getMonthCardString(): string;
    getNextDay(): Date;
    getPreviousDay(): Date;
    getNextMonth(): Date;
    getPreviousMonth(): Date;
  }
}

Date.prototype.isValidDate = function () {
  return !isNaN(this.valueOf());
};

Date.prototype.getMonthString = function () {
  return this.monthStrings[this.getMonth()];
};

Date.prototype.getDayString = function () {
  return this.dayStrings[this.getDay()];
};

Date.prototype.getMobileDateString = function () {
  return `${this.getMonthString().slice(
    0,
    3
  )}. ${this.getDate()}, ${this.getFullYear()}`;
};

Date.prototype.getDesktopDateString = function () {
  return `${this.getDayString()} ${this.getMonth() + 1}/${this.getDate()}`;
};

Date.prototype.getMonthCardString = function () {
  return `${this.getMonthString()} ${this.getFullYear()}`;
};

Date.prototype.getPreviousDay = function () {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 1);
};

Date.prototype.getNextDay = function () {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1);
};

Date.prototype.getNextMonth = function () {
  return new Date(this.getFullYear(), this.getMonth() + 1, 1);
};

Date.prototype.getPreviousMonth = function () {
  const now = new Date();
  const month = this.getMonth() - 1;
  const date = month === now.getMonth() ? now.getDate() : 1;
  return new Date(this.getFullYear(), month, date);
};

Date.prototype.monthStrings = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

Date.prototype.dayStrings = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
