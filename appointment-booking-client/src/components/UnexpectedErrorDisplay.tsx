import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import { Flex2, ErrorNotification, ExitButton } from ".";
import { getMainRoute } from "../app/NavBar/TabList";
import { errorAtom, showErrorAtom } from "../app/Scheduler/atoms";

export const UnexpectedErrorDisplay: FC = () => {
  const [error, setError] = useAtom(errorAtom);
  const [show] = useAtom(showErrorAtom);
  const { route } = useRouter();

  if (error && show && shouldDisplayError[getMainRoute(route)])
    return (
      <Container>
        <StyledErrorNotification error={error.error} message={error.message}>
          <StyledExitButton onClick={() => setError(null)} />
        </StyledErrorNotification>
      </Container>
    );

  return null;
};

const Container = styled(Flex2)`
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.navBar.height};
  z-index: 100;
`;

const StyledErrorNotification = styled(ErrorNotification)`
  flex-direction: row;
`;

const StyledExitButton = styled(ExitButton)`
  position: static;
  margin-left: 20px;
  height: 20px;
  width: 20px;
`;

const shouldDisplayError: { [index: string]: boolean } = {
  "/register": true,
  "/login": true,
  "/schedule": true,
};
