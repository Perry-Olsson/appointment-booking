import React, { useState } from "react";
import { useFetchAppointments } from "../hooks";
import { useGetSelectedDay } from "./hooks";
import { PageView } from "./PageView";
import { isInvalidDate } from "../utils";

const Day = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);

  if (isInvalidDate(day)) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  if (!appointments) return <div>loading...</div>;

  return <PageView day={day} appointments={appointments} />;
};

export default Day;
