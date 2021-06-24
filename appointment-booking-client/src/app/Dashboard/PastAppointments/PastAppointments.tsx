import { FC } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { customerService } from "../../../api";
import { Flex } from "../../../components";
import { AppointmentCard } from "../AppointmentCard";

export const PastAppointments: FC = () => {
  const { data, isLoading } = useQuery(
    "pastAppointments",
    async () => await customerService.pastAppointments(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  if (!data || isLoading) return <div>loading...</div>;

  if (data === "Unauthorized") return <div>You should be on this page</div>;

  return (
    <Container>
      <h1>Past Appointments</h1>
      {data.map(a => {
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
