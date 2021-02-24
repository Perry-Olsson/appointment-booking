import { NewAppointment } from "../../../types";
import { InvalidTimeError } from "../../../utils";
import { Initialize } from "../types";

export const initialize: Initialize = newAppointment => {
  newAppointment.timestamp = new Date(newAppointment.timestamp);

  if (newAppointment.timestamp.getMinutes() % 30 !== 0) {
    throw new InvalidTimeError();
  }

  return newAppointment as NewAppointment;
};
