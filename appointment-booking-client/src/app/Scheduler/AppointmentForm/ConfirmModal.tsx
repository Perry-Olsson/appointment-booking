import React, { FC } from "react";
import { device, ExitButton, FormButton } from "../../../components";
import Modal from "react-modal";
import { NewAppointment, Procedure, Provider } from "../../../types";
import styled from "styled-components";
import { UseMutationResult } from "react-query";
import { ModalContent } from "./ModalContent";

export interface ConfirmModalProps extends ReactModal.Props {
  closeModal: () => void;
  time: string;
  provider: Provider;
  procedure: Procedure;
  comments: string;
  handleSubmit: () => Promise<void>;
  closeForm: () => void;
  createAppointment: UseMutationResult<any, unknown, NewAppointment, unknown>;
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

export const ConfirmModal: FC<ConfirmModalProps> = props => {
  return (
    <Container {...props}>
      <ExitButton size="30px" onClick={props.closeModal} />
      <ModalContent {...props} />
    </Container>
  );
};

export const Cancel = styled(FormButton)`
  margin: 10px;
  border: solid 2px #ff7e7e;
  color: #ff7e7e;
  &:hover {
    background-color: #ff7e7e;
    color: white;
  }
`;

const Container = styled(Modal)`
  position: absolute;
  top: ${({ theme }) => theme.navBar.height};
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid #aaa;
  background: #fff;
  overflow: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: ${device.desktop.pixels}) {
    top: 18%;
    right: 20%;
    bottom: 18%;
    left: 20%;
    justify-content: center;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;
