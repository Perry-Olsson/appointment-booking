import React, { useState } from "react";
import { concatMonths, useFetchAppointments } from "../hooks";
import { useGetSelectedDay } from "./hooks";
import { DayView } from "./DayView";
import { isValidDate } from "../utils";
import { useAtom } from "jotai";
import { monthsAtom } from "../atoms";

const Day = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  const [months, setMonths] = useAtom(monthsAtom);

  if (!isValidDate(day)) return <div>invalid url. Rerouting...</div>;

  if (error) return <div>Can't connect to server</div>;

  if (!appointments || day.valueOf() === 0) return <div>loading...</div>;

  if (months.cursor.valueOf() < day.valueOf()) setMonths(concatMonths(months));

  return <DayView day={day} appointments={appointments} />;
};

export default Day;
