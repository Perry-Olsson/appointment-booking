import React, { useEffect, useRef } from "react";
import { device, Form, Seperator, theme } from "../../../components";
import styled from "styled-components";
import { Procedure } from "./fields/Procedure";
import { Comments, Provider, Time } from "./fields";
import { useAppointmentFormState } from "./hooks";
import { ConfirmModal } from "./ConfirmModal";
import {
  ButtonContainer,
  Cancel,
  ConfirmButton,
  HideFormButton,
} from "./components";

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
    provider,
    procedure,
    isSmallDevice,
  } = useAppointmentFormState();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      containerRef.current!.style.paddingTop = "30px";
      containerRef.current!.style.bottom = theme.dayView.footerHeight;
    }
  }, [show]);

  return (
    <Container
      ref={containerRef}
      id="appointment-form"
      show={show}
      className={className}
    >
      <HideFormButton
        onClick={() =>
          closeAppointmentForm(isSmallDevice, containerRef, setShow)
        }
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

        <ButtonContainer>
          <Cancel
            text="cancel"
            negative
            onClick={e => {
              e.preventDefault();
              closeAppointmentForm(isSmallDevice, containerRef, setShow);
            }}
          />

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
        </ButtonContainer>

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

const closeAppointmentForm = (
  isSmallDevice: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
  setShow: (update: React.SetStateAction<boolean>) => void | Promise<void>
) => {
  if (isSmallDevice) {
    containerRef!.current!.style.paddingTop = "0px";
    containerRef!.current!.style.bottom = window.innerHeight + "px";
    setTimeout(() => {
      setShow(false);
    }, 500);
  } else {
    setShow(false);
  }
};

const Container = styled.div<{ show: boolean }>`
  overflow-y: auto;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: flex-start;
  @media (max-width: ${device.desktop.pixels}) {
    position: absolute;
    top: 0;
    bottom: ${() => window.innerHeight + 2 + "px"};
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
