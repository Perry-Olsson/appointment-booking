import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { device } from "../../../../../components";
import { dimensionsAtom } from "../../../atoms";
import { DayProps } from "../../type";

export const DateString: React.FC<DayProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);
  return <Container>{getDateString(day, width)}</Container>;
};

const getDateString = (day: Date, screenWidth: number) => {
  return device.isTabletOrSmaller(screenWidth)
    ? day.getMobileDateString()
    : day.getDesktopDateString();
};

const Container = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  font-weight: bold;
  @media (min-width: ${device.mobile.pixels}) {
    font-size: ${({ theme }) => theme.font.med};
  }
`;
