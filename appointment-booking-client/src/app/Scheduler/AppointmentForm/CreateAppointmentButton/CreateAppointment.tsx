import { useAtom } from "jotai";
import React from "react";
import { Button } from "../../../../components";
import { dayPageAtom, serviceHoursAtom } from "../../atoms";

export const CreateAppointment: React.FC<CreateAppointmentProps> = ({
  handleClick,
  className,
}) => {
  const [serviceHours] = useAtom(serviceHoursAtom);
  const [day] = useAtom(dayPageAtom);

  if (serviceHours[day.getDay()].isClosed) return null;

  return (
    <Button
      handleClick={handleClick}
      text="Schedule Appointment"
      className={className}
    />
  );
};

interface CreateAppointmentProps {
  handleClick: () => void;
  className?: string;
}
