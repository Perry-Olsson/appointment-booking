import React, { useMemo } from "react";
import { Procedure as ProcedureT, Provider } from "../../../../types";
import { useStaticState } from "../../context";
import { DefaultOption, ErrorText, Label, Select } from "../components";
import { FieldProps } from "../types";

export const Procedure: React.FC<FieldProps> = ({
  register,
  errors,
  watch,
}) => {
  const { providers } = useStaticState();
  const selectedProvider = watch("provider");

  const procedures = useMemo(
    () => getProcedureListFromProviders(providers, selectedProvider),
    [selectedProvider]
  );

  return (
    <Label>
      I'm making an appointment for:
      <Select {...register("procedure", { required: true })} defaultValue="">
        <DefaultOption />
        {procedures.map(procedure => (
          <option key={procedure.name} value={procedure.name}>
            {procedure.name} ({procedure.duration} minutes)
          </option>
        ))}
      </Select>
      {errors.procedure && <ErrorText>This field is required</ErrorText>}
    </Label>
  );
};

const getProcedureListFromProviders = (
  providers: Provider[],
  selectedProvider: string
) => {
  if (selectedProvider) {
    return providers.find(provider => selectedProvider === provider.email)!
      .procedures;
  }
  const procedureMem: any = {};
  let procedures: ProcedureT[] = [];
  providers.forEach(provider => {
    provider.procedures.forEach(procedure => {
      if (!procedureMem[procedure.name]) {
        procedureMem[procedure.name] = procedure.name;
        procedures.push(procedure);
      }
    });
  });
  return procedures;
};
