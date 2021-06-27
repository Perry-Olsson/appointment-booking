import React, { FC } from "react";
import styled from "styled-components";
import { device } from "../../components";
import { useGetUser } from "../../context";
import { AwaitUserProvider } from "../../context/AwaitUser";
import { Navigation } from "./Navigation";

export const DashboardContainer: FC = ({ children }) => {
  const user = useGetUser();

  return (
    <AwaitUserProvider user={user}>
      <Container>
        <Navigation />
        {children}
      </Container>
    </AwaitUserProvider>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${device.desktop.pixels}) {
    grid-template-columns: 1fr 2fr 1fr;
    position: absolute;
    top: ${({ theme }) => theme.navBar.height};
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
