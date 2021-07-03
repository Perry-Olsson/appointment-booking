import React from "react";
import { useGetUser } from "../../context";
import { BurgerTab } from "./Tab";
import { UserTabs } from "./UserTabs";
import { BurgerMenu, device, Logo } from "../../components";
import styled from "styled-components";

export const Burger: React.FC = () => {
  const user = useGetUser();

  return (
    <>
      <Logo isMobile />
      <BurgerMenu>
        <BurgerTab href="/" isFirst={true}>
          Home
        </BurgerTab>
        <BurgerTab href="/about">About</BurgerTab>
        <BurgerTab href="/schedule">Book Online</BurgerTab>
        <UserTabs isBurger />
      </BurgerMenu>
      {user && user !== "loading" ? (
        <ProfileIcon>{user.firstName[0]}</ProfileIcon>
      ) : null}
    </>
  );
};

export const ProfileIcon = styled.div`
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
`;
