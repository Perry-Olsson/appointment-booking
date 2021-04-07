import React from "react";
import { Button } from "../../../../components";

export const CreateAppointment: React.FC<CreateAppointmentProps> = ({
  handleClick,
  className,
}) => {
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
