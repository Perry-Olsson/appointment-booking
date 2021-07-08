import React, { FC } from "react";
import styled from "styled-components";
import { device, StyledTimezoneMessage } from "../../components";
import { useGetUser } from "../../context";
import { AwaitUserProvider } from "../../context/AwaitUser";
import { MobileTabletNav } from "./Navigation";

export const DashboardContainer: FC = ({ children }) => {
  const user = useGetUser();

  return (
    <AwaitUserProvider user={user}>
      <Container>
        <div></div>
        {children}
        <MobileTabletNav />
      </Container>
      <StyledTimezoneMessage />
    </AwaitUserProvider>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${device.desktop.largePixels}) {
    grid-template-columns: 4fr 8fr 4fr;
    height: ${({ theme }) =>
      window.innerHeight - theme.navBar.rawHeight + "px"};
  }
`;
