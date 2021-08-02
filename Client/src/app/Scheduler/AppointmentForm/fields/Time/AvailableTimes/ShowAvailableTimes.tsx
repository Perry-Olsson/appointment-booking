import React from "react";
import { ONE_MINUTE } from "../../../../../../constants";
import { Appointment, Procedure } from "../../../../../../types";
import { useWatchProcedure } from "../../../../hooks";
import { to4DigitTimeNumber } from "../../../../utils";

export const ShowAvailableTimes: React.FC<ShowAvailableTimesProps> = ({
  timeSlots,
  appointments,
  schedule,
}) => {
  const selectedProcedure = useWatchProcedure();

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

          if (
            isTaken(
              slotValue,
              appointments[appointmentIndex],
              selectedProcedure
            )
          )
            return null;
        }

        if (!providerIsAvailable) return null;

        if (isUnavailable(slot, schedule[scheduleIndex], selectedProcedure))
          return null;

        return (
          <option key={slot.valueOf()} value={slot.toJSON()}>
            {slot.getTimeString()}
          </option>
        );
      })}
    </>
  );
};

const isTaken = (
  slotValue: number,
  appointment: Appointment,
  selectedProcedure: Procedure | undefined
) => {
  const procedureEnd = selectedProcedure
    ? slotValue + selectedProcedure.duration * ONE_MINUTE
    : 0;

  const appointmentStart = appointment.timestamp.valueOf();
  const appointmentEnd = appointment.end.valueOf();

  if (
    (slotValue >= appointmentStart && slotValue < appointmentEnd) ||
    (slotValue < appointmentStart && procedureEnd > appointmentStart)
  ) {
    return true;
  }
  return false;
};

const isUnavailable = (
  slot: Date,
  scheduleBoundry: string,
  selectedProcedure: Procedure | undefined
): boolean => {
  const timeValue = slot.valueOf();
  const procedureEnd = selectedProcedure
    ? new Date(
        timeValue + ONE_MINUTE * selectedProcedure.duration
      ).get4DigitTimeNumber()
    : 0;
  const scheduleBoundryTime = to4DigitTimeNumber(scheduleBoundry);

  if (procedureEnd > scheduleBoundryTime) return true;
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
