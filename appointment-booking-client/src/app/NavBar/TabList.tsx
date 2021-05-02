import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { customerService } from "../../api";
import { Flex } from "../../components";
import { useGetUser } from "../../context/User";
import { accessToken } from "../../pages/_app";
import { Tab } from "./Tab";

export const TabList: React.FC = () => {
  const user = useGetUser();
  const client = useQueryClient();
  const router = useRouter();

  return (
    <>
      <Flex>
        <Tab href="/">Home</Tab>
        <Tab href="/about">About</Tab>
        <Tab href="/schedule">Book Online</Tab>
      </Flex>
      <Flex>
        {user && user !== "loading" ? (
          <>
            <span style={{ margin: "10px" }}>
              logged in as {user.firstName}
            </span>

            <button
              onClick={async () => {
                await customerService.logout();
                accessToken.clear();
                client.resetQueries();
                router.push("/");
              }}
            >
              logout
            </button>
          </>
        ) : (
          <Tab href="/login">Log in</Tab>
        )}
      </Flex>
    </>
  );
};
