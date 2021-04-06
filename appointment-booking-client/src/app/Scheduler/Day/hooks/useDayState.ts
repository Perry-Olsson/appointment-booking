import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import { useFetchAppointments, usePrefetchAppointments } from "../../hooks";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  usePrefetchAppointments(prefetchedAppointments ? false : true);

  useEffect(() => {
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return { day, appointments, error };
};
