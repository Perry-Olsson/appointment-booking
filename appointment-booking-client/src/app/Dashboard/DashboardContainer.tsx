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
    grid-template-columns: 1fr 3fr 1fr;
    height: ${({ theme }) =>
      window.innerHeight - theme.navBar.rawHeight + "px"};
  }
`;
