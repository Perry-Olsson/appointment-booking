import { useAtom } from "jotai";
import { createContext, FC, useContext } from "react";
import { useQuery } from "react-query";
import { customerService } from "../api";
import { errorAtom } from "../app/Scheduler/atoms";
import { User } from "../types";

const UserContext = createContext<User | null | "loading">(null);

export const UserProvider: FC = ({ children }) => {
  const [, setError] = useAtom(errorAtom);
  const { data, error } = useQuery<User | "Unauthorized", Error>(
    "user",
    async () => await customerService.user(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: ({ name, message }) => {
        setError({ error: name, message });
      },
    }
  );

  let user: User | null | "loading";
  if (error) {
    user = null;
  } else if (!data) user = "loading";
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
