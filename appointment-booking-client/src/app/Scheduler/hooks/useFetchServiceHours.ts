import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { serviceHourService } from "../../../api";
import { serviceHoursAtom } from "../atoms";

export const useFetchServiceHours = () => {
  const [serviceHours, setServiceHours] = useAtom(serviceHoursAtom);

  const { data, error } = useQuery(
    "serviceHours",
    async () => serviceHourService.fetchServiceHours(),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data && !serviceHours.length) setServiceHours(data);
  }, [data]);

  return { isLoading: serviceHours.length ? false : true, error };
};
