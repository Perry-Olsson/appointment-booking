import { validate } from "email-validator";
import React, { BaseSyntheticEvent, FC } from "react";
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  ErrorText,
  Form,
  Input,
  Label,
  Seperator,
  FormButton,
  ErrorObject,
  ErrorNotification,
  FormFooter,
} from "../../components";
import {
  FormFooterLink,
  FormInnerContainer,
  LoginFormContainer,
  LoginFormHeader,
} from "../Login/LoginView";
import { RegisterFormValues } from "./Register";
import Link from "next/link";

export const RegisterView: FC<RegisterViewProps> = ({
  handleSubmit,
  register,
  control,
  fieldErrors,
  getValues,
  error,
}) => {
  return (
    <LoginFormContainer>
      <FormInnerContainer>
        <LoginFormHeader>Register</LoginFormHeader>
        {error ? (
          <ErrorNotification error={error.error} message={error.message} />
        ) : null}
        <Form onSubmit={handleSubmit}>
          <Label>
            First name
            <Input {...register("firstName", { required: true })} />
            {fieldErrors.firstName && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Label>

          <Seperator />

          <Label>
            Last name
            <Input {...register("lastName", { required: true })} />
            {fieldErrors.lastName && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Label>

          <Seperator />

          <Label>
            Phone number
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                validate: value =>
                  isPossiblePhoneNumber(value) || "Invalid phone number",
              }}
              render={({ field }) => (
                <PhoneInput {...field} defaultCountry="US" />
              )}
            />
            {fieldErrors.phoneNumber && (
              <ErrorText>{fieldErrors.phoneNumber.message}</ErrorText>
            )}
          </Label>

          <Seperator />

          <Label>
            Email
            <Input
              {...register("email", {
                required: "This field is required",
                validate: value =>
                  validate(value) || "This is not a valid email address",
              })}
            />
            {fieldErrors.email && (
              <ErrorText>{fieldErrors.email.message}</ErrorText>
            )}
          </Label>

          <Seperator />

          <Label>
            Password
            <Input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Your password must be atleast 6 characters long",
                },
              })}
              type="password"
            />
            {fieldErrors.password && (
              <ErrorText>{fieldErrors.password.message}</ErrorText>
            )}
          </Label>

          <Seperator />

          <Label>
            Password confirmation
            <Input
              {...register("passwordConfirmation", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Your password must be atleast 6 characters long",
                },
                validate: {
                  matches: passwordConfirmation =>
                    passwordConfirmation === getValues().password
                      ? true
                      : "Passwords do not match",
                },
              })}
              type="password"
            />
            {fieldErrors.passwordConfirmation && (
              <ErrorText>{fieldErrors.passwordConfirmation.message}</ErrorText>
            )}
          </Label>

          <FormButton type="submit" text="Register" />
        </Form>
      </FormInnerContainer>
      <FormFooter>
        Have an account?{" "}
        <Link href="/login">
          <FormFooterLink>Login</FormFooterLink>
        </Link>
      </FormFooter>
    </LoginFormContainer>
  );
};

interface RegisterViewProps {
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  fieldErrors: DeepMap<RegisterFormValues, FieldError>;
  register: UseFormRegister<RegisterFormValues>;
  control: Control<RegisterFormValues>;
  getValues: UseFormGetValues<RegisterFormValues>;
  error: ErrorObject | null;
}
