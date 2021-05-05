import React, { BaseSyntheticEvent, FC } from "react";
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styled from "styled-components";
import {
  Flex,
  ErrorText,
  Form,
  Input,
  Label,
  Seperator,
  Submit,
} from "../../components";
import { RegisterFormValues } from "./Register";

export const RegisterView: FC<RegisterViewProps> = ({
  handleSubmit,
  register,
  control,
  fieldErrors,
}) => {
  console.log(fieldErrors.phoneNumber);
  return (
    <Container>
      <Header>Register</Header>
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
          <Input {...register("lastName", { required: "hello" })} />
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

        <Submit type="submit" text="Register" />
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

interface RegisterViewProps {
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  fieldErrors: DeepMap<RegisterFormValues, FieldError>;
  register: UseFormRegister<RegisterFormValues>;
  control: Control<RegisterFormValues>;
}
