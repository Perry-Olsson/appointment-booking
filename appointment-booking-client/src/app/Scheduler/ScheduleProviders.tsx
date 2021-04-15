import { QueryClient, QueryClientProvider } from "react-query";
import { useDimensions } from "../../hooks";
import { useFetchProviders, useFetchServiceHours } from "./hooks";
import { StaticStateProvider } from "./context";

const queryClient = new QueryClient();

const ScheduleProviders: React.FC<ProviderProps> = ({ children }) => {
  useDimensions();
  const { serviceHours } = useFetchServiceHours();
  const { providers } = useFetchProviders();

  return (
    <StaticStateProvider value={{ serviceHours, providers }}>
      {children}
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
