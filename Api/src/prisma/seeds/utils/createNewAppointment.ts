import { Prisma } from ".prisma/client";
import { HOUR } from "../../../constants";
import { NewAppointment } from "../../../types";

export const createNewAppointment = ({
  timestamp,
  end,
  customerId = "john@example.com",
  procedureId,
  providerId,
}: CreateNewAppointmentArg): NewAppointment => {
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

export interface CreateNewAppointmentArg {
  timestamp: Date;
  end: Date;
  customerId?: string;
  procedureId: string;
  providerId: string;
}
