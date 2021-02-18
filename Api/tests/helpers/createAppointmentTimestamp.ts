import { NewAppointment } from "../../src/types";

export const createAppointmentTimestamp = (
  time: Partial<NewAppointment> = {}
): Date => {
  const now = new Date();

  const year = time.year || now.getFullYear();
  const month = time.month || now.getMonth() + 1;
  const day = time.day || 15;
  const hour = time.hour || 10;
  const minute = time.minute || 30;

  return new Date(year, month, day, hour, minute);
};
