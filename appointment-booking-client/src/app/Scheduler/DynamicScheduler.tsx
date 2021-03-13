import dynamic from "next/dynamic";

export const DynamicScheduler = dynamic(() => import("./Scheduler"), {
  ssr: false,
});
