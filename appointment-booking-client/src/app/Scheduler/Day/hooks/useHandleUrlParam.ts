import { useRouter } from "next/router";
import { useEffect } from "react";
import { isValidDate } from "../../utils";

export const useHandleUrlParam = () => {
  const router = useRouter();

  const day =
    typeof router.query.day === "string"
      ? new Date(router.query.day)
      : new Date(0);

  useEffect(() => {
    if (router.query.day && !isValidDate(day))
      setTimeout(() => router.push("/schedule"), 1000);
  }, [router.query.day]);

  return day;
};
