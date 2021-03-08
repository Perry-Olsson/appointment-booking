import { useAtom } from "jotai";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components";
import { useGetAppointments } from "../../../hooks";
import { appointmentsAtom } from "../atoms";

const DayContainer = () => {
  const router = useRouter();
  useGetAppointments();

  const day =
    typeof router.query.day === "string" ? new Date(router.query.day) : null;

  return <Day day={day} />;
};

const Day: React.FC<DayProps> = ({ day }) => {
  if (!day) return <div>loading</div>;

  const [appointments] = useAtom(appointmentsAtom);
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

interface DayProps {
  day: Date | null;
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
