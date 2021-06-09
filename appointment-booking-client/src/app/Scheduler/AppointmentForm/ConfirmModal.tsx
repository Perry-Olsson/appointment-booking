import React, { FC } from "react";
import styled from "styled-components";
import { device, ExitButton } from "../../../components";
import Modal from "react-modal";
import { FormValues } from "./types";

interface Props extends ReactModal.Props {
  closeModal: () => void;
  formValues: FormValues;
}

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    zIndex: 3,
  },
};

export const ConfirmModal: FC<Props> = ({
  closeModal,
  formValues,
  ...props
}) => {
  return (
    <Container {...props}>
      <ExitButton size="30px" onClick={closeModal} />
      <h2>Your Appointment</h2>
      <div>Procedure: {formValues.procedureId}</div>
      <div>Provider: {formValues.providerId}</div>
      <div>Time: {formValues.timestamp}</div>
    </Container>
  );
};
const Container = styled(Modal)`
  position: absolute;
  top: 40px;
  left: 40px;
  bottom: 40px;
  right: 40px;
  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: ${device.desktop.pixels}) {
    top: 20%;
    right: 20%;
    bottom: 20%;
    left: 20%;
  }
`;
