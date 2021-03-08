import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "jotai";

const queryClient = new QueryClient();

export const ScheduleProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}
