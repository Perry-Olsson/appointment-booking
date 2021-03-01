import { useEffect, useState } from "react";
import { Api } from "../../api";
import { Flex } from "../../components";
import { NowProvider } from "../../context";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  const [appointments, setAppointments] = useState<Map<any, any>>();

  useEffect(() => {
    getAppointments()
      .then(result => setAppointments(result))
      .catch(e => {
        console.log(e);
      });
  }, []);

  console.log(appointments);

  return (
    <NowProvider>
      <Flex>
        <DaysOfTheWeek />
        <MonthList />
      </Flex>
    </NowProvider>
  );
}

const getAppointments = async () => {
  return await api.getAppointments();
};

const api = new Api();
