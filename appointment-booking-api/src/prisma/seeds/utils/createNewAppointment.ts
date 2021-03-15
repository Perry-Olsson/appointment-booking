import { NewAppointment } from "../../../types";

export const createNewAppointment = (
  timestamp: Date,
  end: Date
): NewAppointment => {
  return {
    timestamp,
    end,
  };
};
