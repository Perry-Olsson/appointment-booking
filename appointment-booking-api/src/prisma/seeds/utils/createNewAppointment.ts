import { Prisma } from ".prisma/client";
import { HOUR } from "../../../constants";
import { NewAppointment } from "../../../types";

export const createNewAppointment = (
  timestamp: Date,
  end: Date,
  customerId: string = "test@example.com",
  procedureId: string = "Botox",
  providerId: string = "john@provider.com"
): NewAppointment => {
  if (Math.random() > 0.5) {
    procedureId = "Facial";
    providerId = "jane@provider.com";
  }
  return {
    timestamp,
    end,
    customerId,
    procedureId,
    providerId,
  };
};

export const createNewCustomerAppointment = (
  timestamp: Date
): Omit<Prisma.AppointmentCreateInput, "customer"> => {
  const end = timestamp.valueOf() + HOUR;

  return {
    timestamp: new Date(timestamp),
    end: new Date(end),
    procedure: { connect: { name: "Botox" } },
    provider: { connect: { email: "john@provider.com" } },
  };
};
