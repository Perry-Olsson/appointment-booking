import React from "react";
import { useStaticState } from "../../Day/context";
import { Label, Select, ErrorText, DefaultOption } from "../components";
import { FieldProps } from "../types";

export const Provider: React.FC<FieldProps> = ({ register, errors }) => {
  const { providers } = useStaticState();
  return (
    <Label>
      With:
      <Select {...register("provider", { required: true })} defaultValue="">
        <DefaultOption />
        {providers.map(provider => {
          const fullName = `${provider.firstName} ${provider.lastName}`;
          return (
            <option key={provider.email} value={fullName}>
              {fullName}
            </option>
          );
        })}
      </Select>
      {errors.provider && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};
