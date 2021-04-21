import React from "react";
import { useAtom } from "jotai";
import { nowAtom } from "../../atoms";
import { Link } from "../../../../components";
import { PressableArea } from "./PressableArea";
import { useStaticState } from "../../context";
import { useDeselectTime } from "../../hooks";
import { useIsCard } from "../context/IsMonthCard";
import { useDay } from "../../Day/context";

export const DayViewLink: React.FC<DayViewLinkProps> = ({ day }) => {
  const [{ today }] = useAtom(nowAtom);
  const route = useDay();
  const { serviceHours } = useStaticState();
  const deselectTime = useDeselectTime();
  const isMonthCard = useIsCard();

  const dayHasPassed = day.valueOf() < today.valueOf();
  const disabled =
    dayHasPassed ||
    (serviceHours.length && serviceHours[day.getDay()].isClosed);

  return (
    <Link
      href={`/schedule/${day.toJSON()}`}
      disable={disabled || false}
      onClick={
        isMonthCard && route.valueOf() !== day.valueOf()
          ? deselectTime
          : undefined
      }
    >
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
