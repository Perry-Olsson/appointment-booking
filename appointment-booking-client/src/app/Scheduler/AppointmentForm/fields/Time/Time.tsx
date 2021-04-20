import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { DeepMap, FieldError, UseFormSetValue } from "react-hook-form";
import { Appointment, ServiceDay } from "../../../../../types";
import { AppointmentBoundries, selectedAppointmentAtom } from "../../../atoms";
import { useStaticState } from "../../../context";
import { useAppointments, useDay } from "../../../Day/context";
import { Label, Select, ErrorText, DefaultOption } from "../../components";
import { FieldProps, FormValues } from "../../types";
import { AvailableTimes } from "./AvailableTimes";

export const Time: React.FC<TimeProps> = ({
  timeSlots,
  register,
  errors,
  setValue,
}) => {
  const day = useDay();
  const { serviceHours } = useStaticState();
  const appointments = useAppointments();
  const [selectedAppointment] = useAtom(selectedAppointmentAtom);

  useEffect(() => {
    if (selectedAppointment === null) setValue("time", "");
    else setValue("time", selectedAppointment.start.toJSON());
  }, [selectedAppointment]);

  useEffect(() => {
    setValue("time", "");
  }, [day.valueOf()]);

  if (!serviceHours.length) return null;

  return (
    <Label>
      Time:
      <Select {...register("time", { required: true })} defaultValue="">
        <DefaultOption />
        <AvailableTimes
          timeSlots={timeSlots}
          serviceHours={serviceHours[timeSlots[0].getDay()]}
          appointments={appointments}
        />
      </Select>
      {errors.time && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

interface TimeProps extends FieldProps {
  timeSlots: Date[];
  setValue: UseFormSetValue<FormValues>;
}

const TimeSelectInput: React.FC<TimeSelectInputProps> = ({
  timeSlots,
  serviceHours,
  appointments,
  errors,
  selectedAppointment,
}) => {
  return (
    <Label>
      Time:
      <Select value={selectedAppointment?.start.toJSON() || ""} defaultValue="">
        <DefaultOption />
        <AvailableTimes
          timeSlots={timeSlots}
          serviceHours={serviceHours[timeSlots[0].getDay()]}
          appointments={appointments}
        />
      </Select>
      {errors.time && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

interface TimeSelectInputProps {
  timeSlots: Date[];
  serviceHours: ServiceDay[];
  appointments: Appointment[];
  errors: DeepMap<FormValues, FieldError>;
  selectedAppointment: AppointmentBoundries | null;
}
