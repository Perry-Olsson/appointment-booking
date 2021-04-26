import { QueryClientWrapper } from "../app/Scheduler/ScheduleProviders";

export const getLayoutProvider = (displayName: string | undefined) => {
  switch (displayName) {
    case "schedule":
    case "day":
    case "login":
      return (page: any) => <QueryClientWrapper>{page}</QueryClientWrapper>;
    default:
      return (page: any) => page;
  }
};
