import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import { monthsAtom } from "../../atoms";
import { concatMonths, useFetchAppointments } from "../../hooks";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  const [months, setMonths] = useAtom(monthsAtom);

  useEffect(() => {
    if (months.cursor.valueOf() < day.valueOf())
      setMonths(concatMonths(months));
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return { day, appointments, error };
};
