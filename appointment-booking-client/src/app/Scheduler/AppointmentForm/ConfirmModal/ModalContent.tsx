import React, { FC } from "react";
import styled from "styled-components";
import { ExitButton, Flex, FormButton } from "../../../../components";
import { getDateString } from "../../Day/DayView/components";
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
          }}
        />
      </Flex>
    </>
  );
};

const Header = styled.h2`
  margin: 35px;
`;
