import { UseFormRegister, DeepMap, FieldError } from "react-hook-form";

export interface FieldProps {
  register: UseFormRegister<FormValues>;
  errors: DeepMap<FormValues, FieldError>;
}
export interface FormValues {
  procedure: string;
  provider: string;
  comments: string;
  time: string;
}
