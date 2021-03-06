import React from "react";
import styled from "styled-components";
import { device } from "../../../../components/device";
import { useNow } from "../../../../context";
import { useDimensions } from "../../../../hooks";

//for expanded view only
export const TodayMarker: React.FC<MarkerProps> = ({ day }) => {
  const { today } = useNow();
  const { width } = useDimensions();

  const isToday = today.valueOf() === day.valueOf();

  return width > device.tablet.width && isToday ? <Triangle /> : null;
};

interface MarkerProps {
  day: Date;
}

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid black;
  border-right: 10px solid transparent;
`;
