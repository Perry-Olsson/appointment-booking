import { useAtom } from "jotai";
import React from "react";
import { Button } from "../../../../components";
import { dayPageAtom } from "../../atoms";
import { useStaticState } from "../../context";

export const CreateAppointment: React.FC<CreateAppointmentProps> = ({
  handleClick,
  className,
}) => {
  const { serviceHours } = useStaticState();
  const [day] = useAtom(dayPageAtom);

  if (serviceHours.length && serviceHours[day.getDay()].isClosed) return null;

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
