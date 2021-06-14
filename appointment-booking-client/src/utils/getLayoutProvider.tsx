import { ScheduleProviders } from "../app/Scheduler/ScheduleProviders";
import { DashboardProviders } from "../app/Dashboard";

export const getLayoutProvider = (displayName: string | undefined) => {
  switch (displayName) {
    case "schedule":
    case "day":
      return (page: any) => <ScheduleProviders>{page}</ScheduleProviders>;
    case "dashboard":
      return (page: any) => <DashboardProviders>{page}</DashboardProviders>;
    default:
      return (page: any) => page;
  }
};
