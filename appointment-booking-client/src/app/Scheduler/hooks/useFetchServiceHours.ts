import { useQuery } from "react-query";
import { serviceHourService } from "../../../api";

export const useFetchServiceHours = () => {
  const { data, isLoading, error } = useQuery(
    "serviceHours",
    async () => serviceHourService.fetchServiceHours(),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return {
    serviceHours: data || [],
    serviceHoursLoading: isLoading,
    serviceHoursError: error,
  };
};
