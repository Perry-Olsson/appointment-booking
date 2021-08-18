import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Button, Flex, LinkButton, ProfileIcon } from "../../../components";
import { LoadingIcon } from "../../../components/LoadingIcon";
import { useGetUser } from "../../../context";
import { Tab } from "../Tab";
import { Logout } from "./Logout";

export const NavbarView: React.FC = ({}) => {
  const user = useGetUser();
  const { route } = useRouter();

  if (user === "loading") {
    return route === "/" || route === "/about" ? <StyledLoadingIcon /> : null;
  }

  if (user)
    return (
      <Container>
        <ProfileIcon>{user.firstName[0]}</ProfileIcon>
        <Link href="/dashboard" passHref>
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
  position: static;
  margin-right: 6rem;
`;
