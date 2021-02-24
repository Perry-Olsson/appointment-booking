import { InvalidTimestampError } from "../../../utils";
import { ValidateTimestamp } from "../types";

export const validateTimestamp: ValidateTimestamp = timestamp => {
  if (timestamp.length !== 24 || isNaN(Date.parse(timestamp)))
    throw new InvalidTimestampError(timestamp);
};
