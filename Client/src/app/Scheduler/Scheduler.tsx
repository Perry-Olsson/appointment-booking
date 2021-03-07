import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { api } from "../../api";
import { Flex } from "../../components";
import { appointmentsAtom } from "./atoms";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  const [, setAppointments] = useAtom(appointmentsAtom);
  const { data } = useQuery("appointments", getAppointments);

  useEffect(() => {
    if (data) setAppointments(data);
  }, [data]);

  return (
    <Flex>
      <DaysOfTheWeek />
      <MonthList />
    </Flex>
  );
}

const getAppointments = async () => {
  return await api.getAppointments();
};
