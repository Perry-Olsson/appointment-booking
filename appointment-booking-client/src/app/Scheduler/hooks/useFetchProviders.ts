import { useQuery } from "react-query";
import { providerService } from "../../../api";

export const useFetchProviders = () => {
  const { data, isLoading, error } = useQuery(
    "/providers",
    async () => providerService.fetchProviders(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  return {
    providers: data || [],
    providerLoading: isLoading,
    providerError: error,
  };
};
