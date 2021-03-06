import { useQuery } from "react-query";

import { api } from "../../api";
import { Flex } from "../../components";
import { NowProvider } from "../../context";
import { AppointmentsProvider } from "../../context/Appointments";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  const { data } = useQuery("appointments", getAppointments);

  return (
    <NowProvider>
      <Flex>
        <DaysOfTheWeek />
        <AppointmentsProvider appointments={data}>
          <MonthList />
        </AppointmentsProvider>
      </Flex>
    </NowProvider>
  );
}

const getAppointments = async () => {
  return await api.getAppointments();
};
