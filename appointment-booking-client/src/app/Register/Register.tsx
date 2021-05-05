import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { customerService } from "../../api";
import { useGetUser } from "../../context";
import { accessToken } from "../../pages/_app";
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
    reset,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const router = useRouter();
  const user = useGetUser();
  const client = useQueryClient();

  if (user) {
    if (user === "loading") return <div>loading...</div>;

    router.push("/");
    return <div>loading...</div>;
  }

  const onSubmit = async (data: RegisterFormValues) => {
    const response = await customerService.register(data);
    if (!response.error) {
      const loginResponse = await customerService.login({
        email: data.email,
        password: data.password,
      });

      if (loginResponse.accessToken) {
        accessToken.set(loginResponse.accessToken);
        reset();
        client.setQueryData("user", { ...response });
        await router.push("/schedule");
      }
    }
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
