import React, { createContext, FC, useContext } from "react";
import { useQuery } from "react-query";
import { customerService } from "../api";

export const User: React.FC = ({ children }) => {
  const { data } = useQuery("user", async () => await customerService.user(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  });

  let value: User | null | "loading";
  if (!data) value = "loading";
  else if (data === "Unauthorized") value = null;
  else value = data;

  return <UserProvider value={value}>{children}</UserProvider>;
};

const UserContext = createContext<User | null | "loading">(null);

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  type: "USER";
  firstName: string;
  lastName: string;
}

const UserProvider: FC<{
  children: React.ReactNode;
  value: User | null | "loading";
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useGetUser must be called within its provider");
  return context;
};
