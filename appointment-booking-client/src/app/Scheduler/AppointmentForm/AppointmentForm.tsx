import { useAtom } from "jotai";
import React, { useState } from "react";
import { showAppointmentsFormAtom } from "../atoms";
import {
  Button,
  device,
  ExitButton,
  Flex,
  Form,
  Seperator,
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
import { ConfirmModal } from "./ConfirmModal";

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  timeSlots,
  className,
}) => {
  const [show, setShow] = useAtom(showAppointmentsFormAtom);
  const [modalIsOpen, setIsOpen] = useState(false);
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

  const closeModal = () => setIsOpen(false);

  if (!show) return null;

  return (
    <Container className={className}>
      <HideFormButton onClick={() => setShow(false)} size="22px" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Procedure register={register} errors={errors} />

        <Seperator />

        <Provider register={register} errors={errors} />

        <Seperator />

        <Time timeSlots={timeSlots} register={register} errors={errors} />

        <Seperator />

        <Comments register={register} errors={errors} />

        <ConfirmButton
          type="button"
          text="Confirm"
          onClick={e => {
            e.preventDefault();
            setIsOpen(true);
          }}
        />

        <ConfirmModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeModal={closeModal}
        />

        <Seperator />
      </Form>
    </Container>
  );
};

const ConfirmButton = styled(Button)`
  padding: 10px 30px;
  margin: 20px auto;
`;

const HideFormButton = styled(ExitButton)`
  @media (min-width: ${device.desktop.pixels}) {
    top: ${`${theme.dayView.headerOffset + 8}px`};
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
