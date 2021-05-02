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
  Submit,
  Flex,
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
    <Container>
      <Header>Login</Header>
      {error ? <StyledErrorText>{error}</StyledErrorText> : null}
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

const StyledErrorText = styled(ErrorText)`
  margin: 1rem;
`;
interface LoginViewProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  fieldErrors: DeepMap<LoginFormValues, FieldError>;
  register: UseFormRegister<LoginFormValues>;
  error: string | null;
}
