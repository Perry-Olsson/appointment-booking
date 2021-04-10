import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { serviceHoursAtom } from "../../atoms";

export const useHandleUrlParam = () => {
  const router = useRouter();
  const [serviceHours] = useAtom(serviceHoursAtom);

  const day =
    typeof router.query.day === "string" && router.query.day.length === 24
      ? new Date(router.query.day)
      : new Date("");

  useEffect(() => {
    if (router.query.day && !day.isValidDate())
      setTimeout(() => router.push("/schedule"), 1000);
  }, [router.query.day]);

  return day;
};
