import { to4DigitTimeNumber } from "../../../../../utils";

export const appointmentFitsSlot = (
  schedule: string[],
  timeSlot: Date,
  appointmentEnd: Date
) => {
  for (let i = 0; i < schedule.length; i++) {
    const scheduleTime = to4DigitTimeNumber(schedule[i]);

    if (timeSlot.get4DigitTimeNumber() < scheduleTime) {
      if (i % 2 === 0) return false;
      else {
        const endTime = appointmentEnd.get4DigitTimeNumber();
        if (endTime > scheduleTime) return false;
      }
      return true;
    }
  }
};
