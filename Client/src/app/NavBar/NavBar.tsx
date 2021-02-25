import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/Flex";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { Tab } from "./Tab";

export const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <TabContainer>
        <Tab href="/">Home</Tab>
        <Tab href="/about">About</Tab>
        <Tab href="/schedule">Book Online</Tab>
      </TabContainer>
      {router.pathname === "/schedule" ? <DaysOfTheWeek /> : null}
    </Container>
  );
};

const Container = styled(Flex)`
  position: fixed;
  top: 0;
  flex-direction: column;
  height: ${({ theme }) => theme.navBar.height};
  width: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TabContainer = styled(Flex)`
  justify-content: flex-start;
`;
