import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/Flex";
import { Tab } from "./Tab";

export const NavBar: React.FC = () => {
  return (
    <Container>
      <Tab href="/">Home</Tab>
      <Tab href="/about">About</Tab>
      <Tab href="/schedule">Book Online</Tab>
    </Container>
  );
};

const Container = styled(Flex)`
  justify-content: flex-start;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.primary};
`;
