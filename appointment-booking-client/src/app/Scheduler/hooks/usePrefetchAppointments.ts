import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "../../../api";
import { allAppointmentsAtom } from "../atoms";

export const usePrefetchAppointments = (enabled = true) => {
  const [, setAppointments] = useAtom(allAppointmentsAtom);

  const { data, error } = useQuery(
    "appointments",
    async () => api.prefetchAppointments(),
    { refetchOnMount: false, refetchOnWindowFocus: false, enabled }
  );

  useEffect(() => {
    if (data && enabled) setAppointments(data);
  }, [data]);

  return { error };
};
