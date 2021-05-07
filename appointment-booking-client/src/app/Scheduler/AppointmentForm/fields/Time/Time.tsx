import React from "react";
import { useStaticState } from "../../../context";
import { useAppointments } from "../../../Day/context";
import {
  Label,
  Select,
  ErrorText,
  DefaultOption,
} from "../../../../../components";
import { FieldProps } from "../../types";
import { AvailableTimes } from "./AvailableTimes";

export const Time: React.FC<TimeProps> = ({ timeSlots, register, errors }) => {
  const { serviceHours } = useStaticState();
  const appointments = useAppointments();

  if (!serviceHours.length) return null;

  return (
    <Label>
      Time:
      <Select {...register("timestamp", { required: true })} defaultValue="">
        <DefaultOption />
        <AvailableTimes
          timeSlots={timeSlots}
          serviceHours={serviceHours[timeSlots[0].getDay()]}
          appointments={appointments}
        />
      </Select>
      {errors.timestamp && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

interface TimeProps extends FieldProps {
  timeSlots: Date[];
}
