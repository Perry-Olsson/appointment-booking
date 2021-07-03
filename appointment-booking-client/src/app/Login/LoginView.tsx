import React from "react";
import {
  UseFormHandleSubmit,
  DeepMap,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import {
  Form,
  Label,
  Input,
  ErrorText,
  Seperator,
  FormButton,
  Flex,
  ErrorObject,
  ErrorNotification,
  device,
} from "../../components";
import { FormFooter } from "../../components";
import { LoginFormValues } from "./types";
import Link from "next/link";

export const LoginView: React.FC<LoginViewProps> = ({
  handleSubmit,
  onSubmit,
  error,
  fieldErrors,
  register,
}) => {
  return (
    <LoginFormContainer>
      <FormInnerContainer>
        <LoginFormHeader>Login to your account</LoginFormHeader>
        {error ? (
          <ErrorNotification error={error.error} message={error.message} />
        ) : null}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Email
            <Input {...register("email", { required: true })} />
            {fieldErrors.email && <ErrorText>This field is required</ErrorText>}
          </Label>

          <Seperator />

          <Label>
            Password
            <Input
              {...register("password", { required: true })}
              type="password"
            />
            {fieldErrors.password && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Label>

          <FormButton type="submit" text="Log in" />
        </Form>
      </FormInnerContainer>
      <FormFooter>
        Not registered?{" "}
        <Link href="/register">
          <FormFooterLink>Register</FormFooterLink>
        </Link>
      </FormFooter>
    </LoginFormContainer>
  );
};

export const LoginFormContainer = styled(Flex)`
  @media (min-width: ${device.desktop.pixels}) {
    border: solid 1px ${({ theme }) => theme.colors.primaryLight};
    padding-bottom: 0;
    padding-top: 30px;
    position: static;
  }
  border-radius: 20px;
  max-width: 700px;
  padding-bottom: 60px;
  width: 100vw;
  margin: auto;
`;

export const FormInnerContainer = styled(Flex)`
  width: 100%;
`;

export const FormFooterLink = styled.a`
  margin: 0 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LoginFormHeader = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primaryLight};
`;

interface LoginViewProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  fieldErrors: DeepMap<LoginFormValues, FieldError>;
  register: UseFormRegister<LoginFormValues>;
  error: ErrorObject | null;
}
