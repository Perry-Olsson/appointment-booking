import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { customerService } from "../../api";
import { ErrorObject } from "../../components";
import { useGetUser } from "../../context";
import { accessToken } from "../../pages/_app";
import { LoginView } from "./LoginView";
import { LoginFormValues } from "./types";

export const Login: FC = () => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const client = useQueryClient();
  const router = useRouter();
  const user = useGetUser();
  const [error, setError] = useState<ErrorObject | null>(null);

  if (user) {
    if (user === "loading") return <div>loading...</div>;

    router.push("/");
    return <div>loading...</div>;
  }

  const onSubmit = async (data: LoginFormValues) => {
    const response = await customerService.login(data);

    if (response.accessToken) {
      accessToken.set(response.accessToken);
      reset();
      await client.refetchQueries("user");
      await router.push("/schedule");
    } else {
      setError(response);
      setValue("password", "");
    }
  };

  return (
    <>
      <Logo />
      <LoginView
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        fieldErrors={errors}
        error={error}
      />
    </>
  );
};

const Logo = styled.div`
  height: 200px;
`;
