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
import { LoginFormValues } from "./types";

export const LoginView: React.FC<LoginViewProps> = ({
  handleSubmit,
  onSubmit,
  error,
  fieldErrors,
  register,
}) => {
  return (
    <LoginFormContainer>
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
    </LoginFormContainer>
  );
};

export const LoginFormContainer = styled(Flex)`
  @media (min-width: ${device.desktop.pixels}) {
    border: solid 1px ${({ theme }) => theme.colors.primaryLight};
  }
  border-radius: 20px;
  max-width: 700px;
  margin: auto;
  padding: 30px 0;
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
