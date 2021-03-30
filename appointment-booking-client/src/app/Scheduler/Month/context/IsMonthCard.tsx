import React, { createContext, useContext } from "react";

const IsMonthCardState = createContext<boolean | undefined>(undefined);

export const IsMonthCardProvider: React.FC<{
  children: React.ReactNode;
  isCard: boolean;
}> = ({ children, isCard = false }) => {
  return (
    <IsMonthCardState.Provider value={isCard}>
      {children}
    </IsMonthCardState.Provider>
  );
};

export const useIsCard = () => {
  const context = useContext(IsMonthCardState);
  if (context === undefined)
    throw new Error("useIsCard must be called within a IsMonthCardProvider");

  return context;
};
