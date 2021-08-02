import { NewAppointment } from "src/types";
import { BoundryError, TimeError, TimestampError } from ".";

export class TimestampValidator {
  public validateJSONTimestamp(timestamp: any): Date {
    if (
      typeof timestamp !== "string" ||
      timestamp.length !== 24 ||
      isNaN(Date.parse(timestamp))
    )
      throw new TimestampError(timestamp);
    return new Date(timestamp);
  }

  public validateTime({ timestamp, end }: NewAppointment): void {
    const minutes = timestamp.getMinutes() + end.getMinutes();
    const valueOf = timestamp.valueOf() + end.valueOf();

    if (timestamp.valueOf() <= new Date().valueOf()) {
      throw new TimeError(
        "The timeslot you are trying to book has already passed."
      );
    }

    //checks if timestamps end on quarter hours and seconds and milliseconds are zeroed out
    if (minutes % 15 !== 0 || valueOf % 60000 !== 0) {
      throw new TimeError();
    }
  }

  public validateTimeString(field: any): number {
    const milliseconds = new Date(field).valueOf();
    if (isNaN(milliseconds)) throw new BoundryError();
    return milliseconds;
  }
}
