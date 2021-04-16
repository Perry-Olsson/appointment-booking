import React from "react";
import { useStaticState } from "../../../context";
import { Label, Select, ErrorText, DefaultOption } from "../../components";
import { FieldProps } from "../../types";
import { AvailableTimes } from "./AvailableTimes";

export const Time: React.FC<TimeProps> = ({
  timeSlots,
  register,
  errors,
  watch,
}) => {
  const { serviceHours, providers } = useStaticState();
  const selectedProvider = watch("provider");

  if (!serviceHours.length) return null;

  return (
    <Label>
      Time:
      <Select {...register("time", { required: true })} defaultValue="">
        <DefaultOption />
        <AvailableTimes
          timeSlots={timeSlots}
          serviceHours={serviceHours[timeSlots[0].getDay()]}
          selectedProvider={providers.find(p => p.email === selectedProvider)}
        />
      </Select>
      {errors.time && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

interface TimeProps extends FieldProps {
  timeSlots: Date[];
}
