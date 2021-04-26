import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { device } from "../../components";
import { dimensionsAtom } from "../Scheduler/atoms";
import { Burger } from "./Burger";
import { TabList } from "./TabList";

export const NavBar: React.FC = () => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      {width > device.tablet.width ? <TabList /> : <Burger />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  height: ${({ theme }) => theme.navBar.height};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.primary};
`;
