import { useRouter } from "next/dist/client/router";
import React from "react";
import { Day } from "../../app/Scheduler/Day";
import { useGetAppointments } from "../../hooks";

const day = () => {
  const router = useRouter();
  useGetAppointments();

  const day =
    typeof router.query.day === "string" ? new Date(router.query.day) : null;

  return <Day day={day} />;
};

day.displayName = "day";
export default day;
