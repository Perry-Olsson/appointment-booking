import { getSelectedAppointment } from ".";
import { Appointment, Procedure, Provider } from "../../../../../../../types";
import { to4DigitTimeNumber } from "../../../../../utils";

interface SelectedAppointmentFitsArgs {
  provider: Provider | undefined;
  procedure: Procedure | undefined;
  timeSlot: Date;
  time: Date | undefined;
  appointment: Appointment | undefined;
}

export const selectedAppointmentFits = ({
  provider,
  procedure,
  timeSlot,
  time,
  appointment,
}: SelectedAppointmentFitsArgs) => {
  if (provider && procedure) {
    const selectedAppointment = getSelectedAppointment(time, procedure);
    if (selectedAppointment?.start.valueOf() === timeSlot.valueOf()) {
      return undefined;
    }

    const appointmentEnd = new Date(timeSlot);
    appointmentEnd.setMinutes(timeSlot.getMinutes() + procedure.duration);

    if (appointment) {
      if (appointmentEnd > appointment.timestamp && timeSlot < appointment.end)
        return false;
    }

    const schedule = provider.schedule[timeSlot.getDayString()];

    if (appointmentFitsSlot(schedule, timeSlot, appointmentEnd)) {
      return true;
    }
  }
  return false;
};

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
