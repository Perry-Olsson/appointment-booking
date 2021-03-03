import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components";
import { useAppointments } from "../../../context/Appointments";

interface DayProps {
  day: Date;
}

export const Day: React.FC<DayProps> = ({ day }) => {
  const appointments = useAppointments();
  const month = day.getMonth();
  const date = day.getDate();

  return appointments[month] && appointments[month][date] ? (
    <Grid>
      <Flex>
        <h1>{day.toLocaleDateString()}</h1>
      </Flex>
      <AppointmentsContainer>
        {appointments[month][date].map(a => (
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

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 10% 90%;
`;

const AppointmentsContainer = styled(Flex)`
  flex-direction: column;
`;
