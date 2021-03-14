import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { allAppointmentsAtom } from "../../atoms";
import { Appointment } from "../../../../types";
import { isInvalidDate } from "../../utils";

export const useGetSelectedDay = (): SelectedDay => {
  const router = useRouter();
  const [allAppointments] = useAtom(allAppointmentsAtom);

  const day =
    typeof router.query.day === "string"
      ? new Date(router.query.day)
      : new Date("");

  useEffect(() => {
    if (router.query.day && isInvalidDate(day))
      setTimeout(() => router.push("/schedule"), 1000);
  }, []);

  if (Object.keys(allAppointments).length === 0)
    return { day, prefetchedAppointments: null };

  const month = day.getMonth();
  const date = day.getDate();

  if (allAppointments[month] && allAppointments[month][date])
    return { day, prefetchedAppointments: allAppointments[month][date] };
  return { day, prefetchedAppointments: [] };
};

interface SelectedDay {
  day: Date;
  prefetchedAppointments: Appointment[] | null;
}
