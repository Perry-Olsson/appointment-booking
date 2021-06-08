import { useAtom } from "jotai";
import React from "react";
import { showAppointmentsFormAtom } from "../atoms";
import {
  device,
  Flex,
  Form,
  Seperator,
  Submit,
  theme,
} from "../../../components";
import styled from "styled-components";
import { Procedure } from "./fields/Procedure";
import { Comments, Provider, Time } from "./fields";
import { useFormApi, useStaticState } from "../context";
import { useDeselectFieldsOnChange } from "./hooks";
import { FormValues } from "./types";
import { useGetUser } from "../../../context";
import { concatUser } from "./utils";
import { appointmentService } from "../../../api";
import { useQueryClient } from "react-query";
import { VscChromeClose } from "react-icons/vsc";

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  timeSlots,
  className,
}) => {
  const [show, setShow] = useAtom(showAppointmentsFormAtom);
  const { procedures } = useStaticState();
  const user = useGetUser();
  const client = useQueryClient();
  const {
    formState: { errors },
    setValue,
    register,
    handleSubmit,
  } = useFormApi();
  useDeselectFieldsOnChange();

  const onSubmit = async (data: FormValues) => {
    const appointment = concatUser(data, procedures, user);
    if (!appointment) {
      alert("oops something went wrong");
      return;
    }

    await appointmentService.createAppointment(appointment);
    await client.refetchQueries("user");
    await client.refetchQueries("/providers");
    setValue("timestamp", "");
  };

  if (!show) return null;

  return (
    <Container className={className}>
      <ExitButton onClick={() => setShow(false)} size="22px" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Procedure register={register} errors={errors} />

        <Seperator />

        <Provider register={register} errors={errors} />

        <Seperator />

        <Time timeSlots={timeSlots} register={register} errors={errors} />

        <Seperator />

        <Comments register={register} errors={errors} />

        <Submit type="submit" text="Submit" />
        <Seperator />
      </Form>
    </Container>
  );
};

const ExitButton = styled(VscChromeClose)`
  position: absolute;
  right: 5px;
  top: 5px;
  @media (min-width: ${device.desktop.pixels}) {
    top: ${`${theme.dayView.headerOffset + 5}px`};
  }
`;

const Container = styled(Flex)`
  align-items: flex-start;
`;

export const ResponsiveAppointmentForm = styled(AppointmentForm)`
  @media (max-width: ${device.desktop.pixels}) {
    position: absolute;
    top: ${({ theme }) => theme.dayView.headerOffsetPixels};
    right: 0;
    left: 0;
    z-index: 2;
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
