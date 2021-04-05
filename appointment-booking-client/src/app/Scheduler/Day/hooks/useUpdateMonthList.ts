import { useAtom } from "jotai";
import { useEffect } from "react";
import { monthsAtom, nowAtom } from "../../atoms";
import { concatMonths, monthListIsNotMaxed } from "../../hooks";

export const useUpdateMonthList = () => {
  const [months, setMonths] = useAtom(monthsAtom);
  const [{ today }] = useAtom(nowAtom);

  useEffect(() => {
    if (monthListIsNotMaxed(months, today)) setMonths(concatMonths(months));
  }, []);
};
