import React, { createContext, useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";

export const BurgerMenu: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={state => setIsOpen(state.isOpen)}
      right
    >
      <SetOpenProvider value={setIsOpen}>{children}</SetOpenProvider>
    </Menu>
  );
};

const SetMenuContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

const SetOpenProvider = SetMenuContext.Provider;

export const useIsOpen = () => {
  const context = useContext(SetMenuContext);
  if (context === undefined)
    throw new Error("useIsOpen needs to be called within it's provider");
  return context;
};
