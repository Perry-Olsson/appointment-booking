import { FC } from "react";
import { useQuery } from "react-query";
import { customerService } from "../../../api";
import { AppointmentCard } from "../AppointmentCard";
import { AppointmentListContainer } from "../components";

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
    <AppointmentListContainer>
      <h1>Past Appointments</h1>
      {data.map(a => {
        return <AppointmentCard key={a.id} appointment={a} />;
      })}
    </AppointmentListContainer>
  );
};
