import { ScheduleProviders } from "../app/Scheduler/ScheduleProviders";
import { DashboardContainer } from "../app/Dashboard";

export const getLayoutProvider = (displayName: string | undefined) => {
  switch (displayName) {
    case "schedule":
    case "day":
      return (page: any) => <ScheduleProviders>{page}</ScheduleProviders>;
    case "dashboard":
    case "pastAppointments":
      return (page: any) => <DashboardContainer>{page}</DashboardContainer>;
    default:
      return (page: any) => page;
  }
};
