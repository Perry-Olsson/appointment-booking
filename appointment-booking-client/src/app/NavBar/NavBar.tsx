import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/Flex";
import { Tab } from "./Tab";

export const NavBar: React.FC = () => {
  return (
    <Container>
      <Flex>
        <Tab href="/">Home</Tab>
        <Tab href="/about">About</Tab>
        <Tab href="/schedule">Book Online</Tab>
      </Flex>
      <Flex>
        <Tab href="/login">Log in</Tab>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  height: ${({ theme }) => theme.navBar.height};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.primary};
`;
