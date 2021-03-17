import { NewAppointment } from "../../../types";
import { Appointments } from "../Appointments";
import { Initialize } from "../types";

export const initialize: Initialize = reqBody => {
  const newAppointment = Appointments.validateNewAppointment(reqBody);

  newAppointment.timestamp = new Date(newAppointment.timestamp);

  Appointments.validateTime(newAppointment.timestamp);

  return newAppointment as NewAppointment;
};
