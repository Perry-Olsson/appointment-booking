import { Providers } from "../app/Scheduler/Providers";

export const getLayoutProvider = (displayName: string | undefined) => {
  if (displayName === "day" || displayName === "schedule")
    return (page: any) => <Providers>{page}</Providers>;
  else return (page: any) => page;
};
