import { createContext, useContext, useState } from "react";

const NowStateContext = createContext<{ now: Date; today: Date } | undefined>(
  undefined
);

export const NowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const now = new Date();
  const [state] = useState({
    now: now,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  });

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
