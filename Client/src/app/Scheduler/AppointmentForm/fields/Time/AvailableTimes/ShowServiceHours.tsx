import React from "react";
import { ServiceDay } from "../../../../../../types";
import { isInService } from "../../../../utils/isInService";

export const ShowServiceHours: React.FC<ShowServiceHoursProps> = ({
  timeSlots,
  serviceHours,
}) => {
  return (
    <>
      {timeSlots.map(slot => {
        return isInService(slot, serviceHours) ? (
          <option key={slot.valueOf()} value={slot.toJSON()}>
            {slot.getTimeString()}
          </option>
        ) : null;
      })}
    </>
  );
};

interface ShowServiceHoursProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
}
