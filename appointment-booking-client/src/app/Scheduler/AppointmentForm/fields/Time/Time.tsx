import React from "react";
import { Appointment } from "../../../../../types";
import { useStaticState } from "../../../context";
import { Label, Select, ErrorText, DefaultOption } from "../../components";
import { FieldProps } from "../../types";
import { AvailableTimes } from "./AvailableTimes";

export const Time: React.FC<TimeProps> = ({
  timeSlots,
  appointments,
  register,
  errors,
}) => {
  const { serviceHours } = useStaticState();
  if (!serviceHours.length) return null;
  return (
    <Label>
      Time:
      <Select {...register("time", { required: true })} defaultValue="">
        <DefaultOption />
        <AvailableTimes
          timeSlots={timeSlots}
          appointments={appointments}
          serviceHours={serviceHours[timeSlots[0].getDay()]}
        />
      </Select>
      {errors.time && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

interface TimeProps extends FieldProps {
  timeSlots: Date[];
  appointments: Appointment[];
}
