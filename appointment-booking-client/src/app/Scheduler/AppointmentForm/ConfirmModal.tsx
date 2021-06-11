import React, { FC } from "react";
import { device, ExitButton, Flex, FormButton } from "../../../components";
import Modal from "react-modal";
import { Procedure, Provider } from "../../../types";
import styled from "styled-components";
import { getDateString } from "../Day/DayView/components";

interface Props extends ReactModal.Props {
  closeModal: () => void;
  time: string;
  provider: Provider;
  procedure: Procedure;
  comments: string;
  handleSubmit: () => Promise<void>;
  closeForm: () => void;
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
  procedure,
  time,
  handleSubmit,
  provider,
  comments,
  closeForm,
  ...props
}) => {
  return (
    <Container {...props}>
      <ExitButton size="30px" onClick={closeModal} />
      <Header>Your Appointment</Header>
      <AppointmentInfoItem title="Procedure">
        {procedure.name}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Provider">
        {provider.firstName} {provider.lastName}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Time">
        {(() => {
          const date = new Date(time);
          const end = new Date(time);
          end.setMinutes(end.getMinutes() + procedure.duration);

          return (
            <>
              <h4 style={{ marginBottom: "5px" }}>
                <b>{`${date.getDayString()}, ${getDateString(date, 0)}`}</b>
              </h4>
              <p>
                Start: <b>{date.getTimeString()}</b>
              </p>
              <p>
                End: <b>{end.getTimeString()}</b>
              </p>
            </>
          );
        })()}
      </AppointmentInfoItem>
      {comments !== "" ? (
        <AppointmentInfoItem title="Comments" comments>
          {comments}
        </AppointmentInfoItem>
      ) : null}
      <Flex>
        <Cancel text="cancel" negative handleClick={() => closeModal()} />
        <FormButton
          type="submit"
          text="Submit"
          handleClick={async () => {
            await handleSubmit();
            closeModal();
            closeForm();
          }}
        />
      </Flex>
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

const Header = styled.h2`
  margin: 35px;
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
    top: 13%;
    right: 20%;
    bottom: 13%;
    left: 20%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const AppointmentInfoItem: FC<{
  title: string;
  className?: string;
  comments?: boolean;
}> = ({ title, children, comments, className }) => {
  const Container = styled.div`
    width: 75%;
    margin: 10px;
  `;
  return (
    <Container className={className}>
      <h3 style={{ marginBottom: "5px" }}>
        <b>{title}</b>
      </h3>
      {comments ? (
        <StyledInfoItem>{children}</StyledInfoItem>
      ) : (
        <div>{children}</div>
      )}
    </Container>
  );
};

const StyledInfoItem = styled.div`
  border: solid 1px #cccccc;
  border-radius: 4px;
  padding: 8px;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
`;
