import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { customerService } from "../../api";
import { useGetUser } from "../../context";
import { accessToken } from "../../pages/_app";
import { RegisterView } from "./RegisterView";
import { LoadingIcon } from "../../components";
import { ErrorObject } from "../../components";
import styled from "styled-components";
import { useAtom } from "jotai";
import { errorAtom } from "../Scheduler/atoms";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const Register: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const router = useRouter();
  const user = useGetUser();
  const client = useQueryClient();
  const [error, setError] = useState<ErrorObject | null>(null);
  const [, setUnexpectedError] = useAtom(errorAtom);

  if (user) {
    if (user === "loading") return <LoadingIcon />;

    router.push("/");
    return <LoadingIcon />;
  }

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await customerService.register(
        prunePasswordConfirmation(data)
      );
      if (!response.error) {
        const loginResponse = await customerService.login({
          email: data.email,
          password: data.password,
        });

        if (loginResponse.accessToken) {
          accessToken.set(loginResponse.accessToken);
          reset();
          client.setQueryData("user", response);
          await router.push("/schedule");
        }
      } else {
        setError(response);
      }
    } catch (err) {
      setUnexpectedError({ error: err.name, message: err.message });
    }
  };

  return (
    <Container>
      <RegisterView
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        fieldErrors={errors}
        control={control}
        getValues={getValues}
        error={error}
      />
    </Container>
  );
};

const prunePasswordConfirmation = (
  data: RegisterFormValues
): Omit<RegisterFormValues, "passwordConfirmation"> => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phoneNumber: data.phoneNumber,
  password: data.password,
});

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
