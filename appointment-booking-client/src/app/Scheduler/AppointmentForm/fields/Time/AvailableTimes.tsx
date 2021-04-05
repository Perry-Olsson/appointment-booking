import { Appointment } from "../../../../../types";

export const AvailableTimes: React.FC<AvailableTimesProps> = ({
  timeSlots,
  appointments,
}) => {
  let i = 0;
  return (
    <>
      {timeSlots.map(slot => {
        if (appointments[i]) {
          if (slot.valueOf() === appointments[i].end.valueOf()) i++;
          if (slotIsTaken(slot, appointments, i)) return null;
        }
        return (
          <option key={slot.valueOf()} value={slot.toJSON()}>
            {slot.getTimeString()}
          </option>
        );
      })}
    </>
  );
};

const slotIsTaken = (slot: Date, appointments: Appointment[], i: number) => {
  return (
    i < appointments.length &&
    slot.valueOf() >= appointments[i].timestamp.valueOf()
  );
};

interface AvailableTimesProps {
  appointments: Appointment[];
  timeSlots: Date[];
}
