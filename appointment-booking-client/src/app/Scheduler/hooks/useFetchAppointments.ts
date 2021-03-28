import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "../../../api";
import { ONE_DAY } from "../../../constants";
import { Appointment } from "../../../types";

export const useFetchAppointments = (
  day: Date,
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[] | null>>
) => {
  const queryKey = createQueryKey(day);
  const [, queryString] = queryKey;

  const { data, error } = useQuery(
    queryKey,
    async () => await api.fetchAppointments(queryString),
    { enabled: day.valueOf() > 0 }
  );

  useEffect(() => {
    if (data) setAppointments(data);
  }, [data]);

  return { error };
};

const createQueryKey = (day: Date) => ["appointments", createQueryString(day)];

const createQueryString = (day: Date): string => {
  const start = new Date(day.valueOf());
  const end = new Date(day.valueOf() + ONE_DAY);

  return `?start=${start}&end=${end}`;
};
