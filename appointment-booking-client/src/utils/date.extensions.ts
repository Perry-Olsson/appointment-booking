import { ServiceDay } from "../types";

export {};

declare global {
  interface Date {
    monthStrings: string[];
    dayStrings: Daystring[];
    isValidDate(): boolean;
    getMonthString(): string;
    getDayString(): Daystring;
    getTimeString(): string;
    getMobileDateString(): string;
    getDesktopDateString(): string;
    getMonthCardString(): string;
    getNextDay(): Date;
    getPreviousDay(): Date;
    getNextMonth(serviceHours?: ServiceDay[]): Date;
    getPreviousMonth(serviceHours?: ServiceDay[]): Date;
    get4DigitTimeNumber(): number;
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

Date.prototype.getTimeString = function () {
  const hours = this.getHours() % 12;
  const minutes = this.getMinutes();
  const suffix = this.getHours() < 11 ? "AM" : "PM";
  return `${hours === 0 ? 12 : hours}:${
    minutes === 0 ? "00" : minutes
  } ${suffix}`;
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

Date.prototype.getNextMonth = function (serviceHours) {
  const timestamp = new Date(this.getFullYear(), this.getMonth() + 1, 1);
  if (serviceHours) {
    let counter = 0;
    while (serviceHours[timestamp.getDay()].isClosed && counter < 7) {
      timestamp.setDate(timestamp.getDate() + 1);
      counter++;
    }
  }
  return timestamp;
};
Date.prototype.getPreviousMonth = function (serviceHours) {
  const now = new Date();
  const month = this.getMonth() - 1;
  const date = month === now.getMonth() ? now.getDate() : 1;
  const timestamp = new Date(this.getFullYear(), month, date);
  if (serviceHours) {
    let counter = 0;
    while (serviceHours[timestamp.getDay()].isClosed && counter < 7) {
      timestamp.setDate(timestamp.getDate() + 1);
      counter++;
    }
  }
  return timestamp;
};

Date.prototype.get4DigitTimeNumber = function () {
  return this.getHours() * 100 + this.getMinutes();
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

type Daystring =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
