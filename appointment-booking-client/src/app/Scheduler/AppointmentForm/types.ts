import { UseFormRegister, DeepMap, FieldError } from "react-hook-form";

export interface FieldProps {
  register: UseFormRegister<FormValues>;
  errors: DeepMap<FormValues, FieldError>;
}
export interface FormValues {
  procedureId: string;
  providerId: string;
  comments: string;
  timestamp: string;
}
