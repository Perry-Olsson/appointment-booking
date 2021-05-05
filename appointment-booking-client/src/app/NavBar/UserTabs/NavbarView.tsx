import React from "react";
import styled from "styled-components";
import { Button } from "../../../components";
import { useGetUser } from "../../../context";
import { Tab } from "../Tab";
import { Logout } from "./Logout";

export const NavbarView: React.FC = ({}) => {
  const user = useGetUser();

  return (
    <>
      {user && user !== "loading" ? (
        <Container>
          <span style={{ margin: "10px" }}>logged in as {user.firstName}</span>
          <Logout
            Component={({ handleClick }) => (
              <Button handleClick={handleClick} text="Logout" negative />
            )}
          />
        </Container>
      ) : (
        <>
          <Tab href="/login">Log in</Tab>
          <Tab href="/register">Register</Tab>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  margin: 0 1rem;
`;
