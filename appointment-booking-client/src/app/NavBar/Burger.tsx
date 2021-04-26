import React, { createContext, useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { BurgerTab } from "./Tab";

export const Burger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu isOpen={isOpen} onStateChange={state => setIsOpen(state.isOpen)}>
      <SetMenuContext.Provider value={setIsOpen}>
        <BurgerTab href="/" isFirst={true}>
          Home
        </BurgerTab>
        <BurgerTab href="/about">About</BurgerTab>
        <BurgerTab href="/schedule">Book Online</BurgerTab>
        <BurgerTab href="/login">Log in</BurgerTab>
      </SetMenuContext.Provider>
    </Menu>
  );
};

const SetMenuContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

export const useIsOpen = () => {
  const context = useContext(SetMenuContext);
  if (context === undefined)
    throw new Error("useIsOpen needs to be called within it's provider");
  return context;
};
