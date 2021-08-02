import { FC } from "react";
import styled from "styled-components";

export const NavBarOffset: FC = ({ children }) => {
  return <Container>{children}</Container>;
};
const Container = styled.div`
  padding-top: ${({ theme }) => theme.navBar.height};
`;
