import React, { createContext, useContext } from "react";
import { Procedure, Provider, ServiceDay } from "../../../types";

const StaticDayState = createContext<StaticState | undefined>(undefined);

export const StaticStateProvider: React.FC<{
  value: StaticState;
  children: React.ReactNode;
}> = ({ children, value }) => {
  return (
    <StaticDayState.Provider value={value}>{children}</StaticDayState.Provider>
  );
};

export const useStaticState = () => {
  const context = useContext(StaticDayState);
  if (context === undefined) {
    throw Error("useStaticState must be called within StaticStateProvider");
  }
  return context;
};

interface StaticState {
  serviceHours: ServiceDay[];
  providers: Provider[];
  procedures: Procedure[];
}
