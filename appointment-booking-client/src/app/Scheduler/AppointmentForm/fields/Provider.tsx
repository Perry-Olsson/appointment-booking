import React from "react";
import { Label, Select, ErrorText, DefaultOption } from "../components";
import { FieldProps } from "../types";

export const Provider: React.FC<FieldProps> = ({ register, errors }) => {
  return (
    <Label>
      With:
      <Select {...register("provider", { required: true })} defaultValue="">
        <DefaultOption />
        <option value="provider1">provider #1</option>
        <option value="provider2">provider #2</option>
      </Select>
      {errors.provider && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};
