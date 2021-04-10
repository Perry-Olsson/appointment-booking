import React from "react";
import { useAtom } from "jotai";
import { nowAtom, serviceHoursAtom } from "../../atoms";
import { Link } from "../../../../components";
import { PressableArea } from "./PressableArea";

export const DayViewLink: React.FC<DayViewLinkProps> = ({ day }) => {
  const [{ today }] = useAtom(nowAtom);
  const serviceHours = useAtom(serviceHoursAtom)[0][day.getDay()];
  const dayHasPassed = day.valueOf() < today.valueOf();
  const disabled = dayHasPassed || (serviceHours && serviceHours.isClosed);

  return (
    <Link href={`/schedule/${day.toJSON()}`} disable={disabled}>
      <PressableArea
        day={day}
        today={today.valueOf() === day.valueOf()}
        disabled={disabled}
      />
    </Link>
  );
};

interface DayViewLinkProps {
  day: Date;
}
