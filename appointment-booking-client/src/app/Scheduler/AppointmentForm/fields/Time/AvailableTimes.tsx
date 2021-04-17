import { memo } from "react";
import { Appointment, Provider, ServiceDay } from "../../../../../types";
import { to4DigitTimeNumber } from "../../../utils";

export const AvailableTimes: React.FC<AvailableTimesProps> = ({
  timeSlots,
  serviceHours,
  selectedProvider,
  appointments,
}) => {
  console.log(appointments);
  if (!selectedProvider) {
    return (
      <>
        {timeSlots.map(slot => {
          return isClosed(slot, serviceHours) ? null : (
            <option key={slot.valueOf()} value={slot.toJSON()}>
              {slot.getTimeString()}
            </option>
          );
        })}
      </>
    );
  }

  let appointmentIndex = 0;
  let scheduleIndex = 0;
  let available = false;
  const schedule = selectedProvider.schedule[timeSlots[0].getDayString()];

  if (schedule.length === 0)
    return (
      <option disabled value="">
        {selectedProvider.firstName} {selectedProvider.lastName} is unavailable
        today
      </option>
    );

  return (
    <>
      {timeSlots.map(slot => {
        const time = to4DigitTimeNumber(schedule[scheduleIndex]);
        const slotTime = slot.get4DigitTimeNumber();

        if (slotTime === time) {
          if (scheduleIndex < schedule.length - 1) scheduleIndex++;
          available = !available;
        }

        if (appointments.length > 0) {
          const slotValue = slot.valueOf();
          if (
            slotValue === appointments[appointmentIndex].end.valueOf() &&
            appointmentIndex < appointments.length - 1
          )
            appointmentIndex++;
          if (isTaken(slotValue, appointments[appointmentIndex])) return null;
        }

        return available ? (
          <option key={slot.valueOf()} value={slot.toJSON()}>
            {slot.getTimeString()}
          </option>
        ) : null;
      })}
    </>
  );
};

const isClosed = (timeSlot: Date, serviceHours: ServiceDay) => {
  const open =
    Number(serviceHours.open.slice(0, 2)) * 100 +
    Number(serviceHours.close.slice(3));
  const close =
    Number(serviceHours.close.slice(0, 2)) * 100 +
    Number(serviceHours.close.slice(3));
  const time = timeSlot.getHours() * 100 + timeSlot.getMinutes();

  if (time < open || time >= close) return true;
  else return false;
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

interface AvailableTimesProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
  selectedProvider: Provider | undefined;
  appointments: Appointment[];
}
