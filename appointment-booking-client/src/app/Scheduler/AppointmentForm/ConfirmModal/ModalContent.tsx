import React, { FC } from "react";
import styled from "styled-components";
import {
  AppointmentTime,
  ExitButton,
  Flex,
  FormButton,
} from "../../../../components";
import { AppointmentInfoItem } from "./AppointmentInfoItem";
import { Cancel, ConfirmModalProps } from ".";

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
      <div>
        <ExitButton size="30px" onClick={() => closeModal()} />
        <p>loading...</p>
      </div>
    );
  if (createAppointment.isSuccess)
    return (
      <div>
        <ExitButton size="30px" onClick={() => closeModal(true)} />
        <p>Success!!</p>
      </div>
    );
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
      <Flex>
        <Cancel text="cancel" negative handleClick={() => closeModal()} />
        <FormButton
          type="submit"
          text="Submit"
          handleClick={async () => {
            await handleSubmit();
          }}
        />
      </Flex>
    </>
  );
};

const Header = styled.h2`
  margin: 35px;
`;
