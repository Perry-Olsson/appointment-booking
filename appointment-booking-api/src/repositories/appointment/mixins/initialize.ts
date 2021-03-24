import { appointment } from "../appointment";
import { Initialize } from "../types";

export const initialize: Initialize = reqBody => {
  const newAppointment = appointment.validateNewAppointment(reqBody);

  appointment.validateTime(newAppointment);

  return newAppointment;
};
