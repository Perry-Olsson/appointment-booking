import { useAtom } from "jotai";
import React from "react";
import { showAppointmentsFormAtom } from "../atoms";
import { useForm } from "react-hook-form";
import { Button, Flex } from "../../../components";
import styled from "styled-components";
import { Procedure } from "./fields/Procedure";
import { FormValues } from "./types";
import { Comments, Provider, Time } from "./fields";
import { Appointment } from "../../../types";

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  timeSlots,
  appointments,
  className,
}) => {
  const [show] = useAtom(showAppointmentsFormAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: any) => console.log(data);

  if (!show) return null;

  return (
    <Container className={className}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Procedure register={register} errors={errors} />

        <Seperator />

        <Provider register={register} errors={errors} />

        <Seperator />

        <Time
          appointments={appointments}
          timeSlots={timeSlots}
          register={register}
          errors={errors}
        />

        <Seperator />

        <Comments register={register} errors={errors} />

        <Submit type="submit" text="Submit" />
        <Seperator />
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
  border: solid;
  border-color: #ffffff00;
`;

export interface AppointmentFormProps {
  timeSlots: Date[];
  appointments: Appointment[];
  className?: string;
}
