import { NewAppointment } from "../../../types";

export const createNewAppointment = (
  timestamp: Date,
  end: Date,
  customerId: string = "test@gmail.com"
): NewAppointment => {
  return {
    timestamp,
    end,
    customerId,
  };
};
