import { Appointment, Prisma } from "@prisma/client";

export const parseRawAppointment = (appointment: any): Appointment => {
  const mappedAppointment: any = {};
  for (let field in appointment) {
    if (
      field === "createdAt" ||
      field === "updatedAt" ||
      field === "timestamp" ||
      field === "end"
    ) {
      mappedAppointment[field] = new Date(appointment[field]);
    } else {
      if (isValidAppointmentField(field))
        mappedAppointment[field] = appointment[field];
      else {
        throw new Error(`Invalid appointment field "${field}"`);
      }
    }
  }
  return mappedAppointment as Appointment;
};

const isValidAppointmentField = (field: string): boolean => {
  if (Prisma.AppointmentScalarFieldEnum[field as keyof Appointment])
    return true;
  else return false;
};
