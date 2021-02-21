import { NewAppointment } from "../../../types";
import { InvalidTimeError } from "../../../utils";
import { Initialize } from "../types";

export const initialize: Initialize = newAppointment => {
  if (newAppointment.minute % 30 !== 0) {
    throw new InvalidTimeError();
  }

  if (!newAppointment.timestamp)
    newAppointment.timestamp = new Date(
      newAppointment.year,
      newAppointment.month,
      newAppointment.day,
      newAppointment.hour,
      newAppointment.minute
    );
  newAppointment.timestampz = newAppointment.timestamp;

  return newAppointment as NewAppointment;
};
