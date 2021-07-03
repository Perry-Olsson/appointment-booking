import { FC } from "react";
import styled from "styled-components";
import { Flex } from ".";
import { device } from "./device";

export const FormFooter: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled(Flex)`
  @media (min-width: ${device.desktop.pixels}) {
    position: static;
    background: none;
  }
  border-top: solid 1px ${({ theme }) => theme.colors.secondary};
  position: fixed;
  bottom: 0;
  height: ${({ theme }) => theme.form.footerHeight};
  width: 100%;
  background: white;
  flex-direction: row;
  font-size: ${({ theme }) => theme.font.sm_med};
`;
