import { ScheduleProviders } from "../app/Scheduler/ScheduleProviders";

export const getLayoutProvider = (displayName: string | undefined) => {
  switch (displayName) {
    case "schedule":
    case "day":
      return (page: any) => <ScheduleProviders>{page}</ScheduleProviders>;
    default:
      return (page: any) => page;
  }
};
