import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { device } from "../../../../components/device";
import { useDimensions } from "../../../../hooks";
import { currentTime } from "../../atoms";

//for expanded view only
export const TodayMarker: React.FC<MarkerProps> = ({ day }) => {
  const [{ today }] = useAtom(currentTime);
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
