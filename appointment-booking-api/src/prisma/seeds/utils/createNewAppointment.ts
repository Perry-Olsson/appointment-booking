import { HOUR, ONE_DAY } from "../../../constants";
import { NewAppointment } from "../../../types";
import { getRandomNumber } from "./getRandomNumber";

export const createNewAppointment = (
  timestamp: Date,
  end: Date,
  customerId: string = "test@example.com"
): NewAppointment => {
  return {
    timestamp,
    end,
    customerId,
  };
};

export const createNewCustomerAppointment = (
  timestamp = Date.now()
): {
  appointment: Omit<NewAppointment, "customerId">;
  nextTimestamp: number;
} => {
  const appointment = timestamp + ONE_DAY * getRandomNumber(2);
  const end = appointment + HOUR;

  return {
    appointment: { timestamp: new Date(appointment), end: new Date(end) },
    nextTimestamp: end,
  };
};
