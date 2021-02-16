import { Appointment } from "@prisma/client";

export const parseRawAppointment = (appointment: any): Appointment => {
  const returnApp: any = {};
  for (let field in appointment) {
    if (
      field === "createdAt" ||
      field === "updatedAt" ||
      field === "timestamp"
    ) {
      returnApp[field] = new Date(appointment[field]);
    } else {
      if (isValidAppointmentField(field)) returnApp[field] = appointment[field];
      else throw new Error(`Invalid appointment field: ${field}`);
    }
  }
  if (Object.keys(returnApp).length !== 9)
    throw new Error("Missing fields in appointment");
  return returnApp as Appointment;
};

const isValidAppointmentField = (field: string): boolean => {
  if (
    field === "id" ||
    field === "year" ||
    field === "month" ||
    field === "day" ||
    field === "hour" ||
    field === "minute"
  )
    return true;
  else return false;
};