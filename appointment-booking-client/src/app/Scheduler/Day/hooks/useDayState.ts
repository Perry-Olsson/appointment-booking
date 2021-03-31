import { useAtom } from "jotai";
import { useState } from "react";
import { useGetSelectedDay } from ".";
import { monthsAtom } from "../../atoms";
import { useFetchAppointments } from "../../hooks";

export const useDayState = () => {
  const { day, prefetchedAppointments } = useGetSelectedDay();
  const [appointments, setAppointments] = useState(prefetchedAppointments);
  const { error } = useFetchAppointments(day, setAppointments);
  const [months, setMonths] = useAtom(monthsAtom);

  return { day, appointments, months, setMonths, error };
};
