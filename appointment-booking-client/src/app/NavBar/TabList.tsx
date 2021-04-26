import React from "react";
import { Flex } from "../../components";
import { Tab } from "./Tab";

export const TabList: React.FC = () => {
  return (
    <>
      <Flex>
        <Tab href="/">Home</Tab>
        <Tab href="/about">About</Tab>
        <Tab href="/schedule">Book Online</Tab>
      </Flex>
      <Flex>
        <Tab href="/login">Log in</Tab>
      </Flex>
    </>
  );
};
