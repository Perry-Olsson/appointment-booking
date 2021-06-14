import { FC } from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { UserAppointment } from "../../types";
import { AppointmentInfoItem } from "../Scheduler/AppointmentForm/ConfirmModal/AppointmentInfoItem";
import { AppointmentTime } from "../../components";

interface Props {
  appointment: UserAppointment;
}

export const AppointmentCard: FC<Props> = ({ appointment }) => {
  return (
    <Container>
      <AppointmentInfoItem title="Procedure">
        {appointment.procedure.name}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Provider">
        {appointment.provider.firstName}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Time">
        <AppointmentTime
          time={appointment.timestamp}
          procedure={appointment.procedure}
        />
      </AppointmentInfoItem>
    </Container>
  );
};

const Container = styled(Flex)`
  border: solid 1px gray;
  border-radius: 4px;
  width: 95%;
  max-width: 1000px;
  margin: 10px;
  padding: 20px;
  flex-direction: column;
`;
