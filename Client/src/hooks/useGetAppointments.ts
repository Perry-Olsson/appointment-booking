import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { appointmentsAtom } from "../app/Scheduler/atoms";

export const useGetAppointments = () => {
  const [, setAppointments] = useAtom(appointmentsAtom);
  const { data } = useQuery(
    "appointments",
    async () => await api.getAppointments()
  );

  useEffect(() => {
    if (data) setAppointments(data);
  }, [data]);
};
