import React, { FC } from "react";
import { BurgerView } from "./BurgerView";
import { NavbarView } from "./NavbarView";

export const UserTabs: FC<UserTabsProps> = ({ isBurger }) => {
  if (isBurger) return <BurgerView />;

  return <NavbarView />;
};

interface UserTabsProps {
  isBurger?: boolean;
}
