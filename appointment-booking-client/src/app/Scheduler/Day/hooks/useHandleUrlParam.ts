import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { dayPageAtom } from "../../atoms";

export const useHandleUrlParam = (options?: { setDay: boolean }) => {
  const router = useRouter();
  const [, setDay] = useAtom(dayPageAtom);

  const day =
    typeof router.query.day === "string" && router.query.day.length === 24
      ? new Date(router.query.day)
      : new Date("");

  useEffect(() => {
    if (router.query.day && !day.isValidDate())
      setTimeout(() => router.push("/schedule"), 1000);
    if (options?.setDay) setDay(day);
  }, [router.query.day]);

  return day;
};
