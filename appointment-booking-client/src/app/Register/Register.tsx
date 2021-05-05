import { FC } from "react";
import { useForm } from "react-hook-form";
import { RegisterView } from "./RegisterView";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const Register: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <RegisterView
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      fieldErrors={errors}
      control={control}
    />
  );
};
