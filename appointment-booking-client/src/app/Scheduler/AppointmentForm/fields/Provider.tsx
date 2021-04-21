import React from "react";
import { useStaticState } from "../../context";
import { useWatchProcedure } from "../../hooks";
import { Label, Select, ErrorText, DefaultOption } from "../components";
import { FieldProps } from "../types";

export const Provider: React.FC<FieldProps> = ({ register, errors }) => {
  const { providers } = useStaticState();
  const procedure = useWatchProcedure();

  return (
    <Label>
      With:
      <Select {...register("provider", { required: true })} defaultValue="">
        <DefaultOption />
        {providers.map(provider => {
          const fullName = `${provider.firstName} ${provider.lastName}`;

          if (
            !procedure ||
            provider.procedures.find(p => p.name === procedure.name)
          )
            return (
              <option key={provider.email} value={provider.email}>
                {fullName}
              </option>
            );
          return null;
        })}
      </Select>
      {errors.provider && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};
