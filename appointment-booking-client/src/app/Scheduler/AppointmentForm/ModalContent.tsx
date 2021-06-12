import React, { FC } from "react";
import styled from "styled-components";
import { Flex, FormButton } from "../../../components";
import { getDateString } from "../Day/DayView/components";
import { AppointmentInfoItem } from "./AppointmentInfoItem";
import { Cancel, ConfirmModalProps } from "./ConfirmModal";

export const ModalContent: FC<ConfirmModalProps> = ({
  closeModal,
  procedure,
  provider,
  time,
  handleSubmit,
  comments,
  createAppointment,
}) => {
  if (createAppointment.isIdle)
    return (
      <>
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
  if (createAppointment.isLoading) return <div>loading...</div>;
  if (createAppointment.isSuccess) return <div>Success!!</div>;
  return <div>hello</div>;
};

const Header = styled.h2`
  margin: 35px;
`;
