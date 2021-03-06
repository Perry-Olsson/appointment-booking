import ReactModal from "react-modal";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "jotai";

import { DynamicScheduler } from "../app/Scheduler";

const queryClient = new QueryClient();

export default function schedule() {
  ReactModal.setAppElement("#__next");
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <DynamicScheduler />
      </Provider>
    </QueryClientProvider>
  );
}
