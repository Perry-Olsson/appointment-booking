import { Appointments } from "../Appointments";
import { ValidateNewAppointment } from "../types";

export const validateNewAppointment: ValidateNewAppointment = reqBody => {
  const timestamp = Appointments.validateTimestamp(reqBody.timestamp);
  const end = Appointments.validateTimestamp(reqBody.end);

  return { ...reqBody, timestamp, end };
};
