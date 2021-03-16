import { NewAppointment } from "../../../types";
import { InvalidTimestampError } from "../../../utils";
import { ValidateTimestamp } from "../types";

export const validateTimestamps: ValidateTimestamp = (
  reqBody: any
): NewAppointment => {
  const { timestamp, end } = reqBody;
  if (
    timestamp.length !== 24 ||
    end.length !== 24 ||
    isNaN(Date.parse(timestamp)) ||
    isNaN(Date.parse(end))
  )
    throw new InvalidTimestampError(timestamp);
  else return { timestamp: new Date(timestamp), end: new Date(end) };
};
