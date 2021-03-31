import React from "react";
import { useAtom } from "jotai";
import { nowAtom } from "../../atoms";
import { Link } from "../../../../components";
import { PressableArea } from "./PressableArea";

export const DayViewLink: React.FC<DayViewLinkProps> = ({ day }) => {
  const [{ today }] = useAtom(nowAtom);
  const dayHasPassed = day.valueOf() < today.valueOf();

  return (
    <Link href={`/schedule/${day.toJSON()}`} disable={dayHasPassed}>
      <PressableArea
        day={day}
        today={today.valueOf() === day.valueOf()}
        dayHasPassed={dayHasPassed}
      />
    </Link>
  );
};

interface DayViewLinkProps {
  day: Date;
}
