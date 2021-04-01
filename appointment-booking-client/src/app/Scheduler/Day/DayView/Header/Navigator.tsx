import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { device, Flex } from "../../../../../components";
import { dimensionsAtom } from "../../../atoms";
import { DayProps } from "../../type";
import { NextDay } from "./NextDay";
import { PreviousDay } from "./PreviousDay";

export const Navigator: React.FC<DayProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return device.isDesktop(width) ? (
    <DateString>{getDateString(day, width)}</DateString>
  ) : (
    <Container>
      <PreviousDay />
      <DateString>{getDateString(day, width)}</DateString>
      <NextDay />
    </Container>
  );
};

const getDateString = (day: Date, screenWidth: number) => {
  return device.isTabletOrSmaller(screenWidth)
    ? day.getMobileDateString()
    : day.getDesktopDateString();
};

const Container = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  border: solid 1px;
  border-radius: 2px;
  height: 80%;
`;

const DateString = styled.h2`
  padding: 0 5px;
`;
