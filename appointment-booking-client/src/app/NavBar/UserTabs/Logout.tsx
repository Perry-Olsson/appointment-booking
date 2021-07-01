import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { customerService } from "../../../api";
import { accessToken } from "../../../pages/_app";

export const Logout: React.FC<{ Component: React.FC<any> }> = ({
  Component,
}) => {
  const router = useRouter();
  const client = useQueryClient();

  return (
    <Component
      handleClick={async () => {
        await customerService.logout();
        accessToken.clear();
        client.clear();
        await router.push("/");
      }}
    />
  );
};
