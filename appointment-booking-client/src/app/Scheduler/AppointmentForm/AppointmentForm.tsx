import { useAtom } from "jotai";
import React from "react";
import { showAppointmentsFormAtom } from "../atoms";
import { Button, device, Flex } from "../../../components";
import styled from "styled-components";
import { Procedure } from "./fields/Procedure";
import { Comments, Provider, Time } from "./fields";
import { useWatchFormValues } from "./hooks/useWatchFormValues";
import { useFormApi } from "../Day/context";

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  timeSlots,
  className,
}) => {
  const [show] = useAtom(showAppointmentsFormAtom);
  const {
    watch,
    setValue,
    formState: { errors },
    register,
    handleSubmit,
  } = useFormApi();
  const onSubmit = (data: any) => console.log(data);
  useWatchFormValues(watch, setValue);

  if (!show) return null;

  return (
    <Container className={className}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Procedure register={register} errors={errors} watch={watch} />

        <Seperator />

        <Provider register={register} errors={errors} watch={watch} />

        <Seperator />

        <Time
          timeSlots={timeSlots}
          register={register}
          errors={errors}
          watch={watch}
        />

        <Seperator />

        <Comments register={register} errors={errors} watch={watch} />

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

export const ResponsiveAppointmentForm = styled(AppointmentForm)`
  @media (max-width: ${device.desktop.pixels}) {
    position: absolute;
    top: ${({ theme }) => theme.dayView.headerOffsetPixels};
    right: 0;
    left: 0;
    z-index: 1000;
    background-color: white;
    height: ${({ theme }) =>
      `${
        window.innerHeight -
        theme.dayView.headerOffset -
        theme.dayView.footerOffset
      }px`};
    border: solid 2px gray;
    border-radius: 3px;
    padding-top: 20px;
    overflow-y: scroll;
  }
`;

export interface AppointmentFormProps {
  timeSlots: Date[];
  className?: string;
}

export { ResponsiveAppointmentForm as AppointmentForm };
