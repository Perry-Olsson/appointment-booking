import { InvalidTimeError } from "../../../utils";
import { ValidateTime } from "../types";

export const validateTime: ValidateTime = ({ timestamp, end }) => {
  const minutes = timestamp.getMinutes() + end.getMinutes();
  const valueOf = timestamp.valueOf() + end.valueOf();

  //checks if timestamps end on quarter hours and seconds and milliseconds are zeroed out
  if (minutes % 15 !== 0 || valueOf % 60000 !== 0) {
    throw new InvalidTimeError();
  }
};
