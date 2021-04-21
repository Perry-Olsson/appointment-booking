import { useStaticState } from "../../context";
import { DefaultOption, ErrorText, Label, Select } from "../components";
import { FieldProps } from "../types";

export const Procedure: React.FC<FieldProps> = ({ register, errors }) => {
  const { procedures } = useStaticState();

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
