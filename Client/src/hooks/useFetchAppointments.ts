import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { appointmentsAtom } from "../app/Scheduler/atoms";

export const useFetchAppointments = () => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);
  const { data } = useQuery(
    "appointments",
    async () => await api.getAppointments(),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data && Object.keys(appointments).length === 0) {
      setAppointments(data);
    }
  }, [data]);
};
