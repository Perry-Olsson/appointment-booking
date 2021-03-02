import { createContext, useContext } from "react";
import { OrganizedAppointments } from "../../types";

const AppointmentStateContext = createContext<
  OrganizedAppointments | undefined
>(undefined);

export const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({
  children,
  appointments,
}) => {
  return (
    <AppointmentStateContext.Provider value={appointments}>
      {children}
    </AppointmentStateContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentStateContext);
  if (context === undefined)
    throw Error(
      "useAppointments must be called within the AppointmentsProvider"
    );
  return context;
};

interface AppointmentsProviderProps {
  children: React.ReactNode;
  appointments: OrganizedAppointments | undefined;
}
