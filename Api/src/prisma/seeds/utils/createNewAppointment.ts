import { NewAppointment } from "../../../types";

export const createNewAppointment = (timestamp: Date): NewAppointment => {
  return {
    year: timestamp.getFullYear(),
    month: timestamp.getMonth(),
    day: timestamp.getDate(),
    hour: timestamp.getHours(),
    minute: timestamp.getMinutes(),
    timestamp,
    timestampz: timestamp,
  };
};
