import React from "react";
import { useAtom } from "jotai";
import { nowAtom } from "../../atoms";
import { Link } from "../../../../components";
import { PressableArea } from "./PressableArea";
import { useStaticState } from "../../context";

export const DayViewLink: React.FC<DayViewLinkProps> = ({ day }) => {
  const [{ today }] = useAtom(nowAtom);
  const { serviceHours } = useStaticState();
  const dayHasPassed = day.valueOf() < today.valueOf();
  const disabled =
    dayHasPassed ||
    (serviceHours.length && serviceHours[day.getDay()].isClosed);

  return (
    <Link href={`/schedule/${day.toJSON()}`} disable={disabled || false}>
      <PressableArea
        day={day}
        today={today.valueOf() === day.valueOf()}
        disabled={disabled || false}
      />
    </Link>
  );
};

interface DayViewLinkProps {
  day: Date;
}
