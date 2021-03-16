import { InvalidTimeError } from "../../../utils";
import { ValidateTime } from "../types";

export const validateTime: ValidateTime = timestamp => {
  if (timestamp.getMinutes() % 30 !== 0 || timestamp.valueOf() % 60000 !== 0) {
    throw new InvalidTimeError();
  }
};
