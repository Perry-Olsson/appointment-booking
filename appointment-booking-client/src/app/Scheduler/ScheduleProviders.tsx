// import { QueryClient, QueryClientProvider } from "react-query";
import { useFetchProviders, useFetchServiceHours } from "./hooks";
import { StaticStateProvider } from "./context";
import { getProcedureListFromProviders } from "./utils";
import { FormProvider } from "./context";

export const ScheduleProviders: React.FC<ProviderProps> = ({ children }) => {
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

interface ProviderProps {
  children: React.ReactNode;
}
