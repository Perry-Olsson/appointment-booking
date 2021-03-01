import { createContext } from "react";
import { Appointment } from "../../types";

const AppointmentStateContext = createContext<
  Map<string, Appointment> | undefined
>(undefined);
const AppointmentDispatchContext = createContext<
  Map<string, Appointment> | undefined
>(undefined);
