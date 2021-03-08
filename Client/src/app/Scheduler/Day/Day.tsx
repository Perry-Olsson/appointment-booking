import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components";
import { useFetchAppointments } from "../../../hooks";
import { Appointment } from "../../../types";
import { useGetSelectedDay } from "./hooks";

const DayContainer = () => {
  useFetchAppointments();
  const { day, appointments } = useGetSelectedDay();

  if (!day) return <div>loading...</div>;

  return <Day day={day} appointments={appointments} />;
};

const Day: React.FC<DayProps> = ({ day, appointments }) => {
  return appointments.length ? (
    <Grid>
      <Flex>
        <h1>{day.toLocaleDateString()}</h1>
      </Flex>
      <AppointmentsContainer>
        {appointments.map(a => (
          <div key={a.timestamp.valueOf()}>
            {a.timestamp.toLocaleTimeString()}
          </div>
        ))}
      </AppointmentsContainer>
    </Grid>
  ) : (
    <Grid>
      <Flex>
        <h1>no appointments</h1>
      </Flex>
    </Grid>
  );
};

interface DayProps {
  appointments: Appointment[];
  day: Date;
}

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 10% 90%;
`;

const AppointmentsContainer = styled(Flex)`
  flex-direction: column;
`;

export default DayContainer;
