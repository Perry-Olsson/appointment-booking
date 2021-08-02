import React, { FC } from "react";
import styled from "styled-components";
import {
  AppointmentTime,
  ErrorIcon,
  ExitButton,
  LoadingIcon,
} from "../../../../../components";
import { AppointmentInfoItem } from "../AppointmentInfoItem";
import { ConfirmModalProps } from "..";
import { Cancel, ButtonContainer, ConfirmButton } from "../../components";
import { Success } from "./Success";
import { ContentContainer } from "./components";

export const ModalContent: FC<ConfirmModalProps> = ({
  closeModal,
  procedure,
  provider,
  time,
  handleSubmit,
  comments,
  createAppointment,
}) => {
  if (createAppointment.isLoading)
    return (
      <ContentContainer closeModal={closeModal}>
        <LoadingIcon />
      </ContentContainer>
    );
  if (createAppointment.data && createAppointment.isSuccess) {
    if (createAppointment.data.error)
      return (
        <ContentContainer closeModal={closeModal}>
          <ErrorIcon />
          <Header>{createAppointment.data.error}</Header>
          <p>{createAppointment.data.message}</p>
        </ContentContainer>
      );
    else
      return (
        <ContentContainer closeModal={closeModal} showCancelButton>
          <Success />
        </ContentContainer>
      );
  }
  if (createAppointment.isError) {
    return (
      <ContentContainer closeModal={closeModal}>
        <ErrorIcon />
        <p>Apologies, something went wrong</p>
      </ContentContainer>
    );
  }
  return (
    <>
      <ExitButton size="30px" onClick={() => closeModal()} />
      <Header>Your Appointment</Header>
      <AppointmentInfoItem title="Procedure">
        {procedure.name}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Provider">
        {provider.firstName} {provider.lastName}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Time">
        <AppointmentTime time={time} procedure={procedure} />
      </AppointmentInfoItem>
      {comments !== "" ? (
        <AppointmentInfoItem title="Comments" comments>
          {comments}
        </AppointmentInfoItem>
      ) : null}
      <ButtonContainer>
        <Cancel text="cancel" negative handleClick={() => closeModal()} />
        <ConfirmButton
          type="submit"
          text="Submit"
          handleClick={async () => {
            await handleSubmit();
          }}
        />
      </ButtonContainer>
    </>
  );
};

const Header = styled.h1`
  margin: 35px;
`;
