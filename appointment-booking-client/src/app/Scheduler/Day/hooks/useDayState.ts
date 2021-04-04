import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import { monthsAtom } from "../../atoms";
import { useFetchAppointments } from "../../hooks";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  const [months, setMonths] = useAtom(monthsAtom);

  useEffect(() => {
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return { day, appointments, months, setMonths, error };
};
