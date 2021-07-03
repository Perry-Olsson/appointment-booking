import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  size?: string;
  className?: string;
}

export const Logo: FC<Props> = ({ size = "145px" }) => {
  return <StyledImg src="/logo.png" alt="logo" width={size} />;
};

const StyledImg = styled.img``;
