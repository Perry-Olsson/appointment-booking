import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import { useFetchAppointments, usePrefetchAppointments } from "../../hooks";
import { useFetchServiceHours } from "../../hooks/useFetchServiceHours";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  const { isLoading, error: serviceHoursError } = useFetchServiceHours();
  usePrefetchAppointments(prefetchedAppointments ? false : true);

  useEffect(() => {
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return {
    day,
    loading: isLoading,
    appointments,
    error: error || serviceHoursError,
  };
};
