import React from "react";
import { Label, TextArea } from "../../../../components";
import { FieldProps } from "../types";

export const Comments: React.FC<FieldProps> = ({ register }) => {
  return (
    <Label>
      Questions or comments:
      <TextArea {...register("comments")} />
    </Label>
  );
};
