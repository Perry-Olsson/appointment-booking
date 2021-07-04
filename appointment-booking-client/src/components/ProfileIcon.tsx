import { FC } from "react";
import styled from "styled-components";
import { device } from "./device";
import Link from "next/link";

export const ProfileIcon: FC = ({ children }) => {
  return (
    <Link href="/dashboard">
      <Icon>{children}</Icon>
    </Link>
  );
};

export const Icon = styled.a`
  @media (max-width: ${device.desktop.pixels}) {
    position: fixed;
    top: 14px;
    right: 70px;
  }
  width: 50px;
  height: 50px;
  border: solid 1px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
