import { useQuery } from "react-query";
import { serviceHourService } from "../../../api";
import { ServiceDay } from "../../../types";

export const useFetchServiceHours = (): ServiceHoursState => {
  const { data, isLoading, error } = useQuery(
    "serviceHours",
    async () => serviceHourService.fetchServiceHours(),
    { refetchOnMount: false, refetchOnWindowFocus: false, staleTime: Infinity }
  );

  return {
    data: data || [],
    loading: isLoading,
    error: error,
  };
};

export interface ServiceHoursState {
  data: ServiceDay[];
  loading: boolean;
  error: unknown;
}
