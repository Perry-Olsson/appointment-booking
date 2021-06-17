import React from "react";
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
import { useAppointmentFormState } from "./hooks";
import { ConfirmModal } from "./ConfirmModal";
import { useWatchProcedure, useWatchProvider } from "../hooks";

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  timeSlots,
  className,
}) => {
  const {
    openModal,
    closeModal,
    errors,
    handleSubmit,
    modalIsOpen,
    onSubmit,
    register,
    show,
    setShow,
    getValues,
    trigger,
    createAppointment,
  } = useAppointmentFormState();
  const provider = useWatchProvider();
  const procedure = useWatchProcedure();

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
          onClick={async e => {
            e.preventDefault();
            const isValid = await trigger([
              "procedureId",
              "providerId",
              "timestamp",
            ]);
            if (isValid) openModal();
          }}
        />

        {modalIsOpen ? (
          <ConfirmModal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            closeModal={closeModal}
            time={getValues("timestamp")}
            provider={provider!}
            procedure={procedure!}
            comments={getValues("comments")}
            handleSubmit={handleSubmit(onSubmit)}
            closeForm={() => setShow(false)}
            createAppointment={createAppointment}
          />
        ) : null}

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
