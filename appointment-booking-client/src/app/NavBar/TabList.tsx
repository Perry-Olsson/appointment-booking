import React from "react";
import { Flex } from "../../components";
import { useGetUser } from "../App";
import { Tab } from "./Tab";

export const TabList: React.FC = () => {
  const user = useGetUser();
  return (
    <>
      <Flex>
        <Tab href="/">Home</Tab>
        <Tab href="/about">About</Tab>
        <Tab href="/schedule">Book Online</Tab>
      </Flex>
      <Flex>
        {user ? (
          `logged in as ${user.firstName}`
        ) : (
          <Tab href="/login">Log in</Tab>
        )}
      </Flex>
    </>
  );
};
