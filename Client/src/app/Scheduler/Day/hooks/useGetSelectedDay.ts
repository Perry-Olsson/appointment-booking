import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Appointment } from "../../../../types";
import { appointmentsAtom } from "../../atoms";

export const useGetSelectedDay = (): SelectedDay => {
  const router = useRouter();
  const [appointments] = useAtom(appointmentsAtom);

  const day =
    typeof router.query.day === "string" ? new Date(router.query.day) : null;
  if (!day) return { day, appointments: [] };
  else if (Object.keys(appointments).length === 0)
    return { day, appointments: null };

  const month = day.getMonth();
  const date = day.getDate();

  if (appointments[month] && appointments[month][date])
    return { day, appointments: appointments[month][date] };
  return { day, appointments: [] };
};

interface SelectedDay {
  day: Date | null;
  appointments: Appointment[] | null;
}
