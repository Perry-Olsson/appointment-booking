import React, { createContext, FC, useContext } from "react";
import { useQuery } from "react-query";
import { customerService } from "../api";

export const User: React.FC = ({ children }) => {
  const { data } = useQuery("user", async () => await customerService.user(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  });
  return (
    <UserProvider value={!data || data === "Unauthorized" ? null : data}>
      {children}
    </UserProvider>
  );
};

const UserContext = createContext<User | null>(null);

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
  value: User | null;
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useGetUser must be called within its provider");
  return context;
};
