export class Timestamper {
  public date: Date;

  constructor(date: Date = new Date()) {
    const utcDate = date.getUTCDate();
    if (date.getUTCDay() === 0) date.setUTCDate(utcDate + 1);
    else if (date.getUTCDay() !== 1)
      date.setUTCDate(utcDate + 7 - date.getUTCDay());
    this.date = this.createInitialAppointment(date);
  }

  private createInitialAppointment(date: Date) {
    date.setUTCHours(16);

    const initialAppointmentTimestamp = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours()
    );

    return initialAppointmentTimestamp;
  }

  getNextTimestamp(numberOfDays: number) {
    const newTimestamp = new Date(this.date);
    if (newTimestamp.getUTCDay() === 5)
      newTimestamp.setUTCDate(newTimestamp.getUTCDate() + 3);
    else newTimestamp.setUTCDate(newTimestamp.getUTCDate() + numberOfDays);

    this.date = newTimestamp;

    return newTimestamp;
  }

  setTimeValue(date: Date) {
    this.date = this.createInitialAppointment(date);
  }
}

export const timestamper = new Timestamper();
