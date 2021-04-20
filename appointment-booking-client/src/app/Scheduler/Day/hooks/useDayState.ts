import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useGetSelectedDay } from ".";
import { Appointment, Provider } from "../../../../types";
import { providerAtom, selectedAppointmentAtom } from "../../atoms";
import { useStaticState } from "../../context";
import { computeTimeSlots } from "../DayView/TimeSlots/utils";

export const useDayState = () => {
  const day = useGetSelectedDay();
  const [selectedProvider] = useAtom(providerAtom);
  const [, setSelectedAppointment] = useAtom(selectedAppointmentAtom);

  useEffect(() => {
    setSelectedAppointment(null);
  }, [day.valueOf()]);

  return {
    day,
    serviceHours: useStaticState().serviceHours,
    timeSlots: useMemo(() => computeTimeSlots(day), [day.valueOf()]),
    appointments: getAppointmentsFromProvider(selectedProvider, day),
  };
};

const getAppointmentsFromProvider = (
  selectedProvider: Provider | undefined,
  day: Date
): Appointment[] => {
  const appointments =
    selectedProvider &&
    selectedProvider.appointments[day.getMonth()] &&
    selectedProvider.appointments[day.getMonth()][day.getDate()];

  return appointments ? appointments : [];
};
