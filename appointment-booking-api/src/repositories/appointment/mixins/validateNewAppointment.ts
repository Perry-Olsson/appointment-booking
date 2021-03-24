import { appointment } from "../appointment";
import { ValidateNewAppointment } from "../types";

export const validateNewAppointment: ValidateNewAppointment = reqBody => {
  const timestamp = appointment.validateTimestamp(reqBody.timestamp);
  const end = appointment.validateTimestamp(reqBody.end);

  return { ...reqBody, timestamp, end };
};
