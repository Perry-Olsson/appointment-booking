import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import { useFetchAppointments } from "../../hooks";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);

  useEffect(() => {
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return { day, appointments, error };
};
