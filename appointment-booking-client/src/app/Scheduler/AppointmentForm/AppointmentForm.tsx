import { useAtom } from "jotai";
import React from "react";
import { showAppointmentsFormAtom } from "../atoms";

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ text }) => {
  const [show] = useAtom(showAppointmentsFormAtom);
  if (!show) return null;

  return <div>{text}</div>;
};

interface AppointmentFormProps {
  text: string;
}
