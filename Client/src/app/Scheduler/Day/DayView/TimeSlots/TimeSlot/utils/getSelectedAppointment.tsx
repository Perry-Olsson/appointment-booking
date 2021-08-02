import { Procedure } from "../../../../../../../types";
import { AppointmentBoundries } from "../../../../../types";

export const getSelectedAppointment = (
  time: Date | undefined,
  procedure: Procedure | undefined
): AppointmentBoundries | null => {
  if (time && procedure) {
    const end = new Date(time);
    end.setMinutes(time.getMinutes() + procedure.duration);
    return {
      start: time,
      end,
    };
  }
  return null;
};
