import { Appointments } from "../Appointments";
import { Initialize } from "../types";

export const initialize: Initialize = reqBody => {
  const newAppointment = Appointments.validateTimestamps(reqBody);

  Appointments.validateTime(newAppointment);

  return newAppointment;
};
