import { memo } from "react";
import { Appointment, Provider, ServiceDay } from "../../../../../types";
import { appointmentsAreEqual } from "../../../Day/DayView/TimeSlots/utils";
import { to4DigitTimeNumber } from "../../../utils";

export const AvailableTimes: React.FC<AvailableTimesProps> = memo(
  ({ timeSlots, serviceHours, selectedProvider }) => {
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

    let scheduleIndex = 0;
    let available = false;
    const schedule = selectedProvider.schedule[timeSlots[0].getDayString()];

    if (schedule.length === 0)
      return (
        <option disabled value="">
          {selectedProvider.firstName} {selectedProvider.lastName} is
          unavailable today
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

          return available ? (
            <option key={slot.valueOf()} value={slot.toJSON()}>
              {slot.getTimeString()}
            </option>
          ) : null;
        })}
      </>
    );
  },
  (prev, next) =>
    prev.selectedProvider === next.selectedProvider &&
    prev.timeSlots[0].valueOf() === next.timeSlots[0].valueOf() &&
    appointmentsAreEqual(prev, next)
);

const slotIsTaken = (slot: Date, appointments: Appointment[], i: number) => {
  return (
    i < appointments.length &&
    slot.valueOf() >= appointments[i].timestamp.valueOf()
  );
};

// const providerIsAvailable = (time: string, available: boolean) => {};

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

interface AvailableTimesProps {
  appointments: Appointment[];
  timeSlots: Date[];
  serviceHours: ServiceDay;
  selectedProvider: Provider | undefined;
}
