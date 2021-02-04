import { createContext, useContext, useState } from "react";

const NowStateContext = createContext<Date | undefined>(undefined);

export const NowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state] = useState(new Date());

  return (
    <NowStateContext.Provider value={state}>
      {children}
    </NowStateContext.Provider>
  );
};

export const useNow = () => {
  const context = useContext(NowStateContext);
  if (context === undefined)
    throw new Error("useNow must be called within a NowProvider");
  return context;
};
