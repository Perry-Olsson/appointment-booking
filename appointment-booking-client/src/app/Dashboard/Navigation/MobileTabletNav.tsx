import { useRouter } from "next/router";
import React, { FC, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";

export const MobileTabletNav: FC = () => {
  const { route } = useRouter();
  const locationDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Link href="/dashboard">
        <Icon
          onClick={() => (locationDisplayRef.current!.style.marginLeft = "0")}
          isSelected={route === "/dashboard"}
        >
          <b>Appointments</b>
        </Icon>
      </Link>
      <Link href="/dashboard/pastAppointments">
        <Icon
          onClick={() =>
            (locationDisplayRef.current!.style.marginLeft = `${
              window.screen.width / NumberOfTabs
            }px`)
          }
          isSelected={route === "/dashboard/pastAppointments"}
        >
          <b>Past appointments</b>
        </Icon>
      </Link>
      <LocationDisplay ref={locationDisplayRef} route={route} />
    </Container>
  );
};

const LocationDisplay = styled.div<{ route: string }>`
  position: absolute;
  top: 0;
  margin-left: ${({ route }) => getMargin(route)};
  width: ${() => `${window.screen.width / NumberOfTabs}px`};
  z-index: 6;
  transition: margin-left 0.2s;
  border-top: ${({ theme }) => `solid 3px ${theme.colors.primary}`};
`;

const getMargin = (route: string) => {
  if (route === "/dashboard") return "0";
  else return `${window.screen.width / NumberOfTabs}px`;
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
`;

const Icon = styled.div<{ isSelected?: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px #cccccc;
`;

const NumberOfTabs = 2;
