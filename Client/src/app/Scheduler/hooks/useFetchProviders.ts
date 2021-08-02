import { useQuery } from "react-query";
import { providerService } from "../../../api";
import { Provider } from "../../../types";

export const useFetchProviders = (): ProviderState => {
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
    data: data || [],
    loading: isLoading,
    error: error,
  };
};

export interface ProviderState {
  data: Provider[];
  loading: boolean;
  error: unknown;
}
