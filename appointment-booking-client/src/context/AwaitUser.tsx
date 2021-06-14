import { createContext, FC, useContext } from "react";
import { User } from "../types";

const UserContext = createContext<User | undefined>(undefined);

export const AwaitUserProvider: FC<{ user: User | "loading" | null }> = ({
  children,
  user,
}) => {
  if (user && user !== "loading")
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  return <div>loading...</div>;
};

export const useAwaitUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useAwaitUser must be called within its provider");
  return context;
};
