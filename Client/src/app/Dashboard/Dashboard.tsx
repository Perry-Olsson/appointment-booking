import { FC } from "react";
import { useAwaitUser } from "../../context";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentListContainer } from "./components";

export const Dashboard: FC = () => {
  const user = useAwaitUser();

  return (
    <AppointmentListContainer>
      <h1>Your Appointments</h1>
      {user.appointments.map(a => {
        return <AppointmentCard key={a.id} appointment={a} />;
      })}
    </AppointmentListContainer>
  );
};
