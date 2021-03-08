import React from "react";
import styled from "styled-components";

import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { TodayMarker } from "./Marker";
import { DayViewLink } from "./DayViewLink";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  if (day === null) return <GridCell {...restProps}>{null}</GridCell>;

  return (
    <GridCell {...restProps}>
      <TodayMarker day={day} />
      <DayViewLink day={day} />
    </GridCell>
  );
};

interface DayProps {
  day: Date | null;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)`
  @media (min-width: ${device.tablet.pixels}) {
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
  }
  height: ${({ theme }) => theme.grid.cellWidth};
  max-height: ${({ theme }) => theme.grid.cellMaxWidth};
`;
