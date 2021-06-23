import React, { useEffect, useRef } from "react";
import {
  Button,
  device,
  ExitButton,
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
import { useAtom } from "jotai";
import { dimensionsAtom } from "../atoms";

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
  const [dimensions] = useAtom(dimensionsAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      ref!.current!.style.paddingTop = "30px";
      ref!.current!.style.bottom = theme.dayView.footerHeight;
      console.log("hello");
    }
  }, [show]);

  const isSmallDevice = device.isTabletOrSmaller(dimensions.width);
  return (
    <Container
      ref={ref}
      id="appointment-form"
      show={show}
      className={className}
    >
      <HideFormButton
        onClick={() => {
          if (isSmallDevice) {
            ref!.current!.style.paddingTop = "0px";
            ref!.current!.style.bottom = window.screen.height + "px";
            setTimeout(() => {
              setShow(false);
            }, 500);
          } else {
            setShow(false);
          }
        }}
        size="30px"
      />
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
            isSmallDevice={isSmallDevice}
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
const Container = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: flex-start;
  @media (max-width: ${device.desktop.pixels}) {
    position: absolute;
    top: 0;
    bottom: ${() => window.screen.height + 2 + "px"};
    right: 0;
    left: 0;
    z-index: 4;
    background-color: white;
    border: 1px solid #777777;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 15px;
    overflow-y: scroll;
    transition: bottom 0.4s, padding-top 0.4s;
  }
`;

export interface AppointmentFormProps {
  timeSlots: Date[];
  className?: string;
}

export { AppointmentForm };
