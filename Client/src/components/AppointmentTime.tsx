import { FC } from "react";
import { getDateString } from "../app/Scheduler/Day/DayView/components";
import { Procedure } from "../types";

export const AppointmentTime: FC<{
  time: string | Date;
  procedure: Procedure;
  toLocalTime?: boolean;
}> = ({ time, procedure, toLocalTime }) => {
  const start = typeof time === "string" ? new Date(time) : time;
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + procedure.duration);
  if (toLocalTime) {
    start.convertToLocalTimestamp();
    end.convertToLocalTimestamp();
  }
  return (
    <>
      <h4 style={{ marginBottom: "5px" }}>
        <b>{`${start.getDayString()}, ${getDateString(start, 0)}`}</b>
      </h4>
      <p>
        Start: <b>{start.getTimeString()}</b>
      </p>
      <p>
        End: <b>{end.getTimeString()}</b>
      </p>
    </>
  );
};
