import { FC } from "react";
import styled from "styled-components";
import { device, Flex } from "../../components";
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
        {appointment.procedure.name}{" "}
        {/* tooltip of procedure description and link to full page desription */}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Provider">
        {appointment.provider.firstName} {appointment.provider.lastName}{" "}
        {/* tooltip of provider bio and link to bio page*/}
        {/* image of provider */}
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
  border: solid 2px ${({ theme }) => theme.colors.primaryLight};
  border-radius: 10px;
  width: 95%;
  max-width: ${device.desktop.pixels};
  margin: 10px;
  padding: 20px;
`;
