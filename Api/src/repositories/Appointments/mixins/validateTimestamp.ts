import { InvalidTimestampError } from "../../../utils";

export const validateTimestamp = (timestamp: string): void => {
  if (timestamp.length !== 24 || isNaN(Date.parse(timestamp)))
    throw new InvalidTimestampError(timestamp);
};
