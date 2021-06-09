import React, { FC } from "react";
import styled from "styled-components";
import { device, ExitButton } from "../../../components";
import Modal from "react-modal";

interface Props extends ReactModal.Props {
  closeModal: () => void;
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

export const ConfirmModal: FC<Props> = ({ closeModal, ...props }) => {
  return (
    <Container {...props}>
      <ExitButton size="30px" onClick={closeModal} />
      <h2>Hello</h2>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
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
  padding: 20px;
  @media (min-width: ${device.desktop.pixels}) {
    top: 20%;
    right: 20%;
    bottom: 20%;
    left: 20%;
  }
`;
