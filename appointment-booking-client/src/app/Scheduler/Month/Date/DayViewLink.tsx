import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { device } from "../../../../components/device";
import { nowAtom } from "../../atoms";
import Link from "next/link";

export const DayViewLink: React.FC<ModalTogglerProps> = ({ day }) => {
  const [{ today }] = useAtom(nowAtom);
  const dayHasPassed = day.valueOf() < today.valueOf();

  return (
    <Link href={dayHasPassed ? "" : `/schedule/${day.toJSON()}`}>
      <Container
        today={today.valueOf() === day.valueOf()}
        dayHasPassed={dayHasPassed}
      >
        <Date>{day.getDate()}</Date>
      </Container>
    </Link>
  );
};

interface ModalTogglerProps {
  day: Date;
}

const Container = styled.a<{ today: boolean; dayHasPassed: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ dayHasPassed }) => (dayHasPassed ? "rgba(0, 0, 0, 0.3)" : null)};
  @media (min-width: ${device.tablet.pixels}) {
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0.1rem;
    &:hover {
      background-color: ${({ theme, dayHasPassed }) =>
        dayHasPassed ? null : `${theme.colors.primary}40`};
    }
  }
  @media (max-width: ${device.tablet.pixels}) {
    height: 65%;
    width: 65%;
    border: ${({ today }) => (today ? "solid 1px" : null)};
    border-radius: 50%;
    border-color: gray;
    &:hover {
      background-color: ${({ dayHasPassed }) => (dayHasPassed ? null : "gray")};
      color: ${({ dayHasPassed }) => (dayHasPassed ? null : " white")};
    }
    transition: 0.15s;
  }
  cursor: ${({ dayHasPassed }) => (dayHasPassed ? null : "pointer")};
`;

const Date = styled.b`
  font-size: ${({ theme }) => theme.font.sm_med};
`;
