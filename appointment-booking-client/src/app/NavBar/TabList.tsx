import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { Tab } from "./Tab";
import { UserTabs } from "./UserTabs";

export const TabList: React.FC = () => {
  const { route } = useRouter();
  const locationDisplayRef = useRef<HTMLDivElement>(null);

  const mainRoute = getMainRoute(route);
  const locationDisplayMargin = getLocationDisplayMargin(mainRoute);
  if (locationDisplayRef.current)
    locationDisplayRef.current.style.marginLeft = locationDisplayMargin;
  return (
    <>
      <NonUserTabsContainer>
        <LocationDisplay
          id="locationDisplay"
          ref={locationDisplayRef}
          margin={locationDisplayMargin}
        />
        <Tab isSelected={route === "/"} href="/">
          Home
        </Tab>
        <Tab isSelected={route === "/about"} href="/about">
          About
        </Tab>
        <Tab isSelected={mainRoute === "/schedule"} href="/schedule">
          Book Online
        </Tab>
      </NonUserTabsContainer>
      <UserTabsContainer>
        <UserTabs />
      </UserTabsContainer>
    </>
  );
};

/*
 *  these numbers don't quite match up with the margins and widths
 *  I've set on the Nav tabs and I'm not quite sure why yet.
 */
const getLocationDisplayMargin = (route: string) => {
  switch (route) {
    case "/":
      return "2px";
    case "/about":
      return "158px";
    case "/schedule":
      return "314px";
    case "/login":
      return `${window.innerWidth - 320}px`;
    case "/register":
      return `${window.innerWidth - 164}px`;
    default:
      return "0px";
  }
};

const getMainRoute = (route: string) => {
  let pastFirstSlash = false;
  for (let i = 0; i < route.length; i++) {
    if (route[i] === "/") {
      if (pastFirstSlash) return route.substr(0, i);
      pastFirstSlash = true;
    }
  }
  return route;
};

const LocationDisplay = styled.div<{ margin: string }>`
  position: absolute;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  top: 3px;
  bottom: 0;
  left: 3px;
  margin-left: ${({ margin }) => margin};
  transition: margin-left 0.3s;
  background-color: white;
  width: 155px;
  display: ${({ margin }) => (margin === "0px" ? "none" : "block")};
`;

const UserTabsContainer = styled(Flex)`
  flex-direction: row;
  margin-right: 5px;
`;
const NonUserTabsContainer = styled(Flex)`
  flex-direction: row;
  margin-left: 5px;
`;
