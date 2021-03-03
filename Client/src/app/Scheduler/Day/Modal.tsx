import React from "react";
import ReactModal from "react-modal";
import { Day } from ".";
import { theme } from "../../../components";

export const Modal: React.FC<ModalProps> = ({
  displayModal,
  closeModal,
  day,
}) => {
  return (
    <ReactModal
      isOpen={displayModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={300} // Needs to be the same as tranistion defined in global styles (pages/_app.tsx)
    >
      <Day day={day} />
    </ReactModal>
  );
};

interface ModalProps {
  day: Date;
  displayModal: boolean;
  closeModal: () => void;
}

const customStyles = {
  overlay: {
    position: "fixed",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    backgroundColor: "white",
    top: theme.modal.topOffset,
    right: "5%",
    left: "5%",
  },
} as const;
