import { memo } from "react";
import { Appointment, ServiceDay } from "../../../../../types";
import { appointmentsAreEqual } from "../../../Day/DayView/TimeSlots/utils";

export const AvailableTimes: React.FC<AvailableTimesProps> = memo(
  ({ timeSlots, appointments, serviceHours }) => {
    let i = 0;
    return (
      <>
        {timeSlots.map(slot => {
          if (appointments[i]) {
            if (slot.valueOf() === appointments[i].end.valueOf()) i++;
            if (slotIsTaken(slot, appointments, i)) return null;
          }
          return isClosed(slot, serviceHours) ? null : (
            <option key={slot.valueOf()} value={slot.toJSON()}>
              {slot.getTimeString()}
            </option>
          );
        })}
      </>
    );
  },
  (prev, next) =>
    prev.timeSlots[0].valueOf() === next.timeSlots[0].valueOf() &&
    appointmentsAreEqual(prev, next)
);

const slotIsTaken = (slot: Date, appointments: Appointment[], i: number) => {
  return (
    i < appointments.length &&
    slot.valueOf() >= appointments[i].timestamp.valueOf()
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

interface AvailableTimesProps {
  appointments: Appointment[];
  timeSlots: Date[];
  serviceHours: ServiceDay;
}
