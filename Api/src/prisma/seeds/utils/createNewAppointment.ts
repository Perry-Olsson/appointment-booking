import { NewAppointment } from "../../../types";

export const createNewAppointment = (timestamp: Date): NewAppointment => {
  return {
    timestamp,
  };
};
