import React, { createContext, useContext } from "react";

const DayState = createContext<Date | undefined>(undefined);

export const DayProvider: React.FC<{
  value: Date;
  children: React.ReactNode;
}> = ({ children, value }) => {
  return <DayState.Provider value={value}>{children}</DayState.Provider>;
};

export const useDay = () => {
  const context = useContext(DayState);
  if (context === undefined) {
    return new Date("");
  }
  return context;
};
