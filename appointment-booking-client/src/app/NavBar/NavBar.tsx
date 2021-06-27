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
      <InnerContainer width={width}>
        {width > device.tablet.largeWidth ? <TabList /> : <Burger />}
      </InnerContainer>
    </Container>
  );
};

//doesn't display tabs until device width is known
const InnerContainer = styled.div<{ width: number }>`
  display: ${({ width }) => (width === 0 ? "none" : "flex")};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  height: ${({ theme }) => theme.navBar.height};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.primary};
`;
