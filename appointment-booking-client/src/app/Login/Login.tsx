import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { customerService } from "../../api";
import {
  ErrorText,
  Flex,
  Form,
  Input,
  Label,
  Seperator,
  Submit,
} from "../../components";
import { auth } from "../../utils/accessToken";
import { LoginFormValues } from "./types";

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const onSubmit = async (data: LoginFormValues) => {
    const { accessToken } = await customerService.login(data);

    auth.setAccessToken(accessToken);
  };

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Email
          <Input {...register("email", { required: true })} />
          {errors.email && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Seperator />

        <Label>
          Password
          <Input
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Submit type="submit" text="Log in" />
      </Form>
    </Container>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
`;

const Header = styled.h2`
  margin: 1rem;
`;
