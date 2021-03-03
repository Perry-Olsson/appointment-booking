import { useEffect, useState } from "react";
import { Api } from "../../api";
import { Flex } from "../../components";
import { NowProvider } from "../../context";
import { AppointmentsProvider } from "../../context/Appointments";
import { OrganizedAppointments } from "../../types";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  const [appointments, setAppointments] = useState<OrganizedAppointments>();

  useEffect(() => {
    getAppointments()
      .then(result => setAppointments(result))
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <NowProvider>
      <Flex>
        <DaysOfTheWeek />
        <AppointmentsProvider appointments={appointments}>
          <MonthList />
        </AppointmentsProvider>
      </Flex>
    </NowProvider>
  );
}

const getAppointments = async () => {
  return await api.getAppointments();
};

const api = new Api();
