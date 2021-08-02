import React, { createContext, useContext } from "react";
import { Appointment } from "../../../../types";

const AppointmentState = createContext<Appointment[]>([]);

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
  value,
}) => {
  return (
    <AppointmentState.Provider value={value}>
      {children}
    </AppointmentState.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentState);
  if (context === undefined) {
    throw Error("useStaticState must be called within StaticStateProvider");
  }
  return context;
};

interface AppointmentProviderProps {
  value: Appointment[];
  children: React.ReactNode;
}
