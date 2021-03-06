import React from "react";
import styled from "styled-components";
import { device } from "../../../components/device";
import { useDimensions } from "../../hooks/useDimensions";

export const Marker: React.FC = () => {
  const { width } = useDimensions();

  return width > device.tablet.width ? <Triangle /> : null;
};

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid black;
  border-right: 10px solid transparent;
`;
