import React, { FC } from "react";
import { useGetUser } from "../../context";
import { AwaitUserProvider } from "../../context/AwaitUser";

export const DashboardProviders: FC = ({ children }) => {
  const user = useGetUser();

  return <AwaitUserProvider user={user}>{children}</AwaitUserProvider>;
};
