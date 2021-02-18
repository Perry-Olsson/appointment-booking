import { Appointments } from "../../../repositories/Appointments";
import { NewAppointment } from "../../../types";

export const isDuplicate = async (newAppointment: NewAppointment) => {
  const duplicateAppointment = await Appointments.findUnique({
    where: { timestamp: newAppointment.timestamp },
  });

  if (duplicateAppointment) return true;
  else return false;
};
