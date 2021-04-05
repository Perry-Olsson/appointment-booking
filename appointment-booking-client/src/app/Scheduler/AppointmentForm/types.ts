import { UseFormRegister, DeepMap, FieldError } from "react-hook-form";

export interface FormProps {
  register: UseFormRegister<FormValues>;
  errors: DeepMap<FormValues, FieldError>;
}
export interface FormValues {
  procedure: string;
  provider: string;
  comments: string;
  time: string;
}
