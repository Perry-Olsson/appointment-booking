import { TimestampError } from "../../../utils";
import { ValidateTimestamp } from "../types";

export const validateTimestamp: ValidateTimestamp = timestamp => {
  if (
    typeof timestamp !== "string" ||
    timestamp.length !== 24 ||
    isNaN(Date.parse(timestamp))
  )
    throw new TimestampError(timestamp);
  return new Date(timestamp);
};
