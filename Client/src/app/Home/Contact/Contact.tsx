import React from "react";
import styled from "styled-components";
import { device, Flex2 } from "../../../components";
import { Socials } from "./Socials";

export const Contact: React.FC = () => {
  return (
    <BarContainer>
      <BottomBar>
        <Socials />
        <h2>425-921-9489</h2>
      </BottomBar>
    </BarContainer>
  );
};

const BarContainer = styled.div`
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
`;

const BottomBar = styled(Flex2)`
  flex-direction: row;
  justify-content: space-between;
  height: ${({ theme }) => theme.navBar.height};
  max-width: ${({ theme }) => theme.homePage.maxWidth};
  margin: auto;
  padding: 0 1rem;
  @media (min-width: ${device.desktop.pixels}) {
    padding: 0;
  }
`;
