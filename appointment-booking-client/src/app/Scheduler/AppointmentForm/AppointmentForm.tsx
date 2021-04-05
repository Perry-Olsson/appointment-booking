import { useAtom } from "jotai";
import React from "react";
import { showAppointmentsFormAtom } from "../atoms";
import { useForm } from "react-hook-form";
import { Button, Flex } from "../../../components";
import styled from "styled-components";
import { Procedure } from "./fields/Procedure";
import { FormValues } from "./types";
import { ErrorText, Label, Select, TextArea } from "./components";

export const AppointmentForm: React.FC = () => {
  const [show] = useAtom(showAppointmentsFormAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: any) => console.log(data);

  if (!show) return null;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Procedure register={register} errors={errors} />

        <Seperator />

        <Label>
          With:
          <Select {...register("provider", { required: true })} defaultValue="">
            <option disabled value="">
              {" "}
              -- select an option --{" "}
            </option>
            <option value="provider1">provider #1</option>
            <option value="provider2">provider #2</option>
          </Select>
          {errors.provider && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Seperator />

        <Label>
          Time:
          <Select {...register("time", { required: true })} />
          {errors.time && <ErrorText>This field is required</ErrorText>}
        </Label>

        <Seperator />

        <Label>
          questions or comments:
          <TextArea {...register("comments")} />
        </Label>
        <Submit type="submit" text="Submit" />
      </Form>
    </Container>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
`;

const Container = styled(Flex)`
  align-items: flex-start;
`;

const Submit = styled(Button)`
  padding: 10px 30px;
  margin: 20px auto;
`;

const Seperator = styled.div`
  height: 20px;
`;
