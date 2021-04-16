import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useGetSelectedDay } from ".";
import { device } from "../../../../components";
import { Appointment, Provider } from "../../../../types";
import { dimensionsAtom, providerAtom } from "../../atoms";
import { useStaticState } from "../../context";
import { computeTimeSlots } from "../DayView/TimeSlots/utils";

export const useDayState = () => {
  const day = useGetSelectedDay();
  const [{ width }] = useAtom(dimensionsAtom);
  const [selectedProvider] = useAtom(providerAtom);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getAppointmentsFromProvider(selectedProvider, day));
  }, [selectedProvider, day.valueOf()]);

  return {
    day,
    serviceHours: useStaticState().serviceHours,
    timeSlots: useMemo(() => computeTimeSlots(day), [day.valueOf()]),
    isDesktop: device.isDesktop(width),
    appointments,
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
