import React from "react";
import styled from "styled-components";

import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { TodayMarker } from "./TodayMarker";
import { DayViewLink } from "./DayViewLink";

export const Date: React.FC<DayProps> = ({ day, small, ...restProps }) => {
  if (day === null)
    return (
      <GridCell small={small} {...restProps}>
        {null}
      </GridCell>
    );

  return (
    <GridCell small={small} {...restProps}>
      {small ? null : <TodayMarker day={day} />}
      <DayViewLink day={day} small={small} />
    </GridCell>
  );
};

interface DayProps {
  day: Date | null;
  small: boolean | undefined;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)<{ small: boolean | undefined }>`
  @media (min-width: ${({ small }) =>
      small ? "100000px" : device.tablet.pixels}) {
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
  }
  height: ${({ theme, small }) => (small ? "3vw" : theme.grid.cellHeight)};
  max-height: ${({ theme }) => theme.grid.cellMaxHeight};
`;
