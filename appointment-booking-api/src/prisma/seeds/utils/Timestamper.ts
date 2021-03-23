import { getRandomNumber } from "./getRandomNumber";

export class Timestamper {
  public timeValue: number;

  constructor(date: Date = new Date()) {
    this.timeValue = this.createInitialAppointment(date);
  }

  private createInitialAppointment(date: Date) {
    date.setUTCHours(16);

    const initialAppointmentTimestamp = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours()
    );

    return initialAppointmentTimestamp.valueOf();
  }

  getNextTimestamp(timeValue: number, rngUpperbound = 1) {
    const newTimestamp = new Date(
      this.timeValue + timeValue * getRandomNumber(rngUpperbound)
    );

    this.timeValue = newTimestamp.valueOf();

    return newTimestamp;
  }

  setTimeValue(date: Date) {
    this.timeValue = this.createInitialAppointment(date);
  }
}

export const timestamper = new Timestamper();
