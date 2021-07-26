import { createContext, FC, useContext } from "react";
import { useQuery } from "react-query";
import { customerService } from "../api";
import { User } from "../types";

const UserContext = createContext<User | null | "loading">(null);

export const UserProvider: FC = ({ children }) => {
  const { data, error } = useQuery(
    "user",
    async () => await customerService.user(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  let user: User | null | "loading";
  if (error) user = null;
  else if (!data) user = "loading";
  else if (data === "Unauthorized") user = null;
  else user = data;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useGetUser must be called within its provider");
  return context;
};
