import { FC } from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { useAwaitUser } from "../../context";
import { AppointmentCard } from "./AppointmentCard";

export const Dashboard: FC = () => {
  const user = useAwaitUser();

  return (
    <Container>
      <h1>Your Appointments</h1>
      {user.appointments.map(a => {
        return <AppointmentCard key={a.id} appointment={a} />;
      })}
    </Container>
  );
};

const Container = styled(Flex)`
  justify-content: flex-start;
  margin-top: 20px;
  padding-bottom: 60px;
  flex-direction: column;
`;
