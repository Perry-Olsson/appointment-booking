import React from "react";
import { useGetUser } from "../../../context";
import { BurgerButton, BurgerTab } from "../Tab";
import { Logout } from "./Logout";

export const BurgerView: React.FC<BurgerViewProps> = ({}) => {
  const user = useGetUser();

  if (user && user !== "loading")
    return (
      <>
        <BurgerTab href="/dashboard">Dashboard</BurgerTab>
        <Logout
          Component={({ handleClick }) => (
            <BurgerButton handleClick={handleClick}>Logout</BurgerButton>
          )}
        />
      </>
    );

  return (
    <>
      <BurgerTab href="/login">Login</BurgerTab>
      <BurgerTab href="/register">Register</BurgerTab>
    </>
  );
};

interface BurgerViewProps {}
