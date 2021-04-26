import { QueryClient, QueryClientProvider } from "react-query";
import { useFetchProviders, useFetchServiceHours } from "./hooks";
import { StaticStateProvider } from "./context";
import { getProcedureListFromProviders } from "./utils";
import { FormProvider } from "./context";

const queryClient = new QueryClient();

const ScheduleProviders: React.FC<ProviderProps> = ({ children }) => {
  const { serviceHours } = useFetchServiceHours();
  const { providers } = useFetchProviders();

  return (
    <StaticStateProvider
      value={{
        serviceHours,
        providers,
        procedures: getProcedureListFromProviders(providers),
      }}
    >
      <FormProvider>{children}</FormProvider>
    </StaticStateProvider>
  );
};

export const QueryClientWrapper: React.FC<ProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScheduleProviders>{children}</ScheduleProviders>
    </QueryClientProvider>
  );
};

interface ProviderProps {
  children: React.ReactNode;
}
