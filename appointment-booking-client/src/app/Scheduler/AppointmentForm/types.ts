import {
  UseFormRegister,
  DeepMap,
  FieldError,
  UseFormWatch,
} from "react-hook-form";

export interface FieldProps {
  register: UseFormRegister<FormValues>;
  errors: DeepMap<FormValues, FieldError>;
  watch: UseFormWatch<FormValues>;
}
export interface FormValues {
  procedure: string;
  provider: string;
  comments: string;
  time: string;
}
