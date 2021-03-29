import React, { useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { device } from "../../../../components/device";
import { nowAtom } from "../../atoms";
import Link from "next/link";

export const DayViewLink: React.FC<DayViewLinkProps> = ({ day, small }) => {
  const [{ today }] = useAtom(nowAtom);
  const dayHasPassed = day.valueOf() < today.valueOf();
  const [background, setBackground] = useState("white");

  return (
    <Link href={dayHasPassed ? "" : `/schedule/${day.toJSON()}`}>
      <Container
        today={today.valueOf() === day.valueOf()}
        dayHasPassed={dayHasPassed}
        background={background}
        onTouchStart={() => setBackground("gray")}
        onTouchEnd={() => setBackground("white")}
        small={small}
      >
        <DateValue small={small}>{day.getDate()}</DateValue>
      </Container>
    </Link>
  );
};

interface DayViewLinkProps {
  day: Date;
  small: boolean | undefined;
}

interface ContainerProps {
  today: boolean;
  dayHasPassed: boolean;
  background: string;
  small: boolean | undefined;
}

const Container = styled.a<ContainerProps>`
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ dayHasPassed }) => (dayHasPassed ? "rgba(0, 0, 0, 0.3)" : null)};
  @media (min-width: ${({ small }) =>
      small ? "100000px" : device.tablet.pixels}) {
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0.1rem;
  }
  @media (hover: hover) {
    :hover {
      background-color: ${({ theme, dayHasPassed }) =>
        dayHasPassed ? null : `${theme.colors.primary}40`};
    }
  }
  @media (max-width: ${({ small }) =>
      small ? "100000px" : device.tablet.pixels}) {
    height: 65%;
    width: 65%;
    border: ${({ today }) => (today ? "solid 1px" : null)};
    border-radius: 50%;
    border-color: gray;
    transition: 0.15s;
  }
  cursor: ${({ dayHasPassed }) => (dayHasPassed ? null : "pointer")};
`;

const DateValue = styled.b<{ small: boolean | undefined }>`
  font-size: ${({ theme, small }) =>
    small ? theme.font.sm : theme.font.sm_med};
`;
