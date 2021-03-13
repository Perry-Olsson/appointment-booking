import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const ScheduleProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}
