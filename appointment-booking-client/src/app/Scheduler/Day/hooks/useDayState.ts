import { useAtom } from "jotai";
import { useMemo } from "react";
import { useGetSelectedDay } from ".";
import { Appointment, Provider } from "../../../../types";
import { providerAtom } from "../../atoms";
import { useStaticState } from "../../context";
import { computeTimeSlots } from "../DayView/TimeSlots/utils";

export const useDayState = () => {
  const day = useGetSelectedDay();
  const [selectedProvider] = useAtom(providerAtom);

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
