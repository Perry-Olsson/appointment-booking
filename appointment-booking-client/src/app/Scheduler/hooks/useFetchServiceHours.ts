import { useQuery } from "react-query";
import { serviceHourService } from "../../../api";

export const useFetchServiceHours = () => {
  const { data, isLoading, error } = useQuery(
    "serviceHours",
    async () => serviceHourService.fetchServiceHours(),
    { refetchOnMount: false, refetchOnWindowFocus: false, staleTime: Infinity }
  );

  return {
    serviceHours: data || [],
    serviceHoursLoading: isLoading,
    serviceHoursError: error,
  };
};
