import React, { useState } from "react";
import { useFetchAppointments } from "../hooks";
import { useGetSelectedDay } from "./hooks";
import { DayView } from "./DayView";
import { isValidDate } from "../utils";

const Day = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);

  if (!isValidDate(day)) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  if (!appointments || day.valueOf() === 0) return <div>loading...</div>;

  return <DayView day={day} appointments={appointments!} />;
};

export default Day;
