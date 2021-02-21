import { NewAppointment } from "../../../types";
import { InvalidTimeError } from "../../../utils";
import { Initialize } from "../types";

export const initialize: Initialize = newAppointment => {
  if (newAppointment.minute % 30 !== 0) {
    throw new InvalidTimeError();
  }

  assignTimestamp(newAppointment);

  return newAppointment as NewAppointment;
};

const assignTimestamp = (newAppointment: any) => {
  newAppointment.timestamp = new Date(
    newAppointment.year,
    newAppointment.month,
    newAppointment.day,
    newAppointment.hour,
    newAppointment.minute
  );
  newAppointment.timestampz = newAppointment.timestamp;
};
