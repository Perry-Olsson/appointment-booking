import React from "react";
import { Appointment } from "../../../../../../types";
import { to4DigitTimeNumber } from "../../../../utils";

export const ShowAvailableTimes: React.FC<ShowAvailableTimesProps> = ({
  timeSlots,
  appointments,
  schedule,
}) => {
  let appointmentIndex = 0;
  let scheduleIndex = 0;
  let providerIsAvailable = false;

  return (
    <>
      {timeSlots.map(slot => {
        const time = to4DigitTimeNumber(schedule[scheduleIndex]);
        const slotTime = slot.get4DigitTimeNumber();

        if (slotTime === time) {
          if (scheduleIndex < schedule.length - 1) scheduleIndex++;
          providerIsAvailable = !providerIsAvailable;
        }

        if (appointments.length) {
          const slotValue = slot.valueOf();
          if (appointmentBoundryHit(slotValue, appointments, appointmentIndex))
            appointmentIndex++;

          if (isTaken(slotValue, appointments[appointmentIndex])) return null;
        }

        if (!providerIsAvailable) return null;

        return (
          <option key={slot.valueOf()} value={slot.toJSON()}>
            {slot.getTimeString()}
          </option>
        );
      })}
    </>
  );
};

const isTaken = (slotValue: number, appointment: Appointment) => {
  if (
    slotValue >= appointment.timestamp.valueOf() &&
    slotValue < appointment.end.valueOf()
  ) {
    return true;
  }
  return false;
};

const appointmentBoundryHit = (
  slotValue: number,
  appointments: Appointment[],
  index: number
) => {
  return (
    slotValue === appointments[index].end.valueOf() &&
    index < appointments.length - 1
  );
};

interface ShowAvailableTimesProps {
  appointments: Appointment[];
  timeSlots: Date[];
  schedule: string[];
}
