import React from "react";
import { ErrorText, Label, Select } from "../components";
import { FormProps } from "../types";

export const Procedure: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <Label>
      I'm making an appointment for:
      <Select {...register("procedure", { required: true })} defaultValue="">
        <option disabled value="">
          {" "}
          -- select an option --{" "}
        </option>
        <option value="procedure1">procedure #1 (30 min)</option>
        <option value="procedure2">procedure #2 (1h)</option>
        <option value="procedure3">procedure #3 (1h 30 min)</option>
      </Select>
      {errors.procedure && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};
