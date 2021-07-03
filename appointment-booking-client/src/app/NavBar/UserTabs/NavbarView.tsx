import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Button, Flex, LinkButton, LoadingIcon } from "../../../components";
import { useGetUser } from "../../../context";
import { ProfileIcon } from "../Burger";
import { Tab } from "../Tab";
import { Logout } from "./Logout";

export const NavbarView: React.FC = ({}) => {
  const user = useGetUser();
  const { route } = useRouter();

  if (user === "loading") {
    return route === "/" || route === "/about" ? (
      <StyledLoadingIcon color="white" />
    ) : null;
  }

  if (user)
    return (
      <Container>
        <ProfileIcon>{user.firstName[0]}</ProfileIcon>
        <Link href="/dashboard">
          <LinkButton style={{ margin: "10px" }} text="Dashboard" />
        </Link>
        <Logout
          Component={({ handleClick }) => (
            <Button handleClick={handleClick} text="Logout" />
          )}
        />
      </Container>
    );

  return (
    <>
      <Tab isSelected={route === "/login"} href="/login">
        Log in
      </Tab>
      <Tab isSelected={route === "/register"} href="/register">
        Register
      </Tab>
    </>
  );
};

const Container = styled(Flex)`
  flex-direction: row;
  margin: 0 1rem;
`;

const StyledLoadingIcon = styled(LoadingIcon)`
  margin-right: 6rem;
`;
