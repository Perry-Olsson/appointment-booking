import React from "react";
import styled from "styled-components";

import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { TodayMarker } from "./TodayMarker";
import { DayViewLink } from "./DayViewLink";
import { useIsCard } from "../context/IsMonthCard";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  const isMonthCard = useIsCard();

  return (
    <GridCell isMonthCard={isMonthCard} {...restProps}>
      {day ? (
        <>
          <TodayMarker day={day} />
          <DayViewLink day={day} />
        </>
      ) : null}
    </GridCell>
  );
};

interface DayProps {
  day: Date | null;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)<{ isMonthCard: boolean }>`
  @media (min-width: ${({ isMonthCard }) =>
      isMonthCard ? "100000px" : device.tablet.pixels}) {
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
  }
  height: ${({ theme, isMonthCard }) =>
    isMonthCard ? "3.1vw" : theme.grid.cellHeight};
  max-height: ${({ theme }) => theme.grid.cellMaxHeight};
`;
