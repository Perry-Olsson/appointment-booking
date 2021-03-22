import { Prisma } from ".prisma/client";
import { HOUR } from "../../../constants";
import { NewAppointment } from "../../../types";

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
  timestamp: Date
): Omit<Prisma.AppointmentCreateInput, "customer"> => {
  const end = timestamp.valueOf() + HOUR;

  return { timestamp: new Date(timestamp), end: new Date(end) };
};
