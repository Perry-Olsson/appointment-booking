import { QueryClient, QueryClientProvider } from "react-query";
import { useDimensions } from "../../hooks";

const queryClient = new QueryClient();

export const ScheduleProviders: React.FC<ProvidersProps> = ({ children }) => {
  useDimensions();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

interface ProvidersProps {
  children: React.ReactNode;
}
