import { useEffect } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../../../api";
import { Appointment } from "../../../types";

export const useFetchAppointments = (
  day: Date,
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[] | null>>,
  options = defaultQueryOptions
) => {
  const queryKey = createQueryKey(day);
  const [, queryString] = queryKey;

  const { data, error } = useQuery(
    queryKey,
    async () => await api.fetchAppointments(queryString),
    options
  );

  useEffect(() => {
    if (data) setAppointments(data);
  }, [data]);

  return { error };
};

const createQueryKey = (day: Date) => [
  "appointments",
  createQueryString(day, ["year", "month", "day"]),
];

const defaultQueryOptions: UseQueryOptions<
  Appointment[],
  unknown,
  Appointment[]
> = {
  refetchOnWindowFocus: false,
};

const createQueryString = (day: Date, fields: QueryField[]): string => {
  let qString = "?";
  fields.forEach((field, i) => {
    if (i !== 0) qString += "&";

    switch (field) {
      case "year":
        qString += `year=${day.getFullYear()}`;
        break;
      case "month":
        qString += `month=${day.getMonth()}`;
        break;
      case "day":
        qString += `day=${day.getDate()}`;
        break;
      case "hour":
        qString += `hour=${day.getHours()}`;
        break;
      case "minute":
        qString += `minute=${day.getMinutes()}`;
        break;
      default:
        const exaustiveCheck: never = field;
        throw new Error(`Unhandled query field: ${exaustiveCheck}`);
    }
  });
  return qString;
};

type QueryField = "year" | "month" | "day" | "hour" | "minute";
