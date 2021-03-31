import { useAtom } from "jotai";
import { allAppointmentsAtom } from "../../atoms";
import { Appointment, OrganizedAppointments } from "../../../../types";
import { useHandleUrlParam } from "./useHandleUrlParam";

export const useGetSelectedDay = (): SelectedDay => {
  const [allAppointments] = useAtom(allAppointmentsAtom);
  const day = useHandleUrlParam();

  if (pageRefreshed(allAppointments))
    return { day, prefetchedAppointments: null };

  const month = day.getMonth();
  const date = day.getDate();

  if (allAppointments[month] && allAppointments[month][date])
    return { day, prefetchedAppointments: allAppointments[month][date] };

  return { day, prefetchedAppointments: [] };
};

const pageRefreshed = (allAppointments: OrganizedAppointments): boolean => {
  return Object.keys(allAppointments).length === 0;
};

interface SelectedDay {
  day: Date;
  prefetchedAppointments: Appointment[] | null;
}
