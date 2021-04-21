import { useAtom } from "jotai";
import { selectedAppointmentAtom } from "../atoms";
import { useFormApi } from "../Day/context";

export const useDeselectTime = () => {
  const { setValue } = useFormApi();
  const [, setSelectedAppointment] = useAtom(selectedAppointmentAtom);

  return () => {
    setValue("time", "");
    setSelectedAppointment(null);
  };
};
