import React from "react";
import { useAppointments } from "../../../context/Appointments";

interface DayProps {
  day: Date;
}

export const Day: React.FC<DayProps> = ({ day }) => {
  const appointments = useAppointments();
  const month = day.getMonth();
  const date = day.getDate();

  return appointments[month] && appointments[month][date] ? (
    <div>
      {appointments[month][date].map(a => (
        <div key={a.timestamp.valueOf()}>{a.timestamp.toLocaleString()}</div>
      ))}
    </div>
  ) : (
    <div>no appointments</div>
  );
};
