import { useEffect, useState } from "react";
import { useGetSelectedDay } from ".";
import {
  useFetchAppointments,
  useFetchProviders,
  usePrefetchAppointments,
} from "../../hooks";
import { useFetchServiceHours } from "../../hooks/useFetchServiceHours";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { appointmentsError } = useFetchAppointments(day, setAppointments);
  const { serviceHours, serviceHoursError } = useFetchServiceHours();
  const { providers, providerError } = useFetchProviders();
  usePrefetchAppointments(prefetchedAppointments ? false : true);

  useEffect(() => {
    if (prefetchedAppointments) setAppointments(prefetchedAppointments);
  }, [day.valueOf()]);

  return {
    day,
    providers,
    serviceHours,
    loading: !appointments || !providers || !serviceHours,
    appointments,
    error: appointmentsError || serviceHoursError || providerError,
  };
};
