import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  isMobile?: boolean;
}

export const Logo: FC<Props> = ({ isMobile }) => {
  return (
    <StyledImg
      src="/logo.png"
      alt="logo"
      width={isMobile ? "140px" : "145px"}
      isMobile
    />
  );
};

const StyledImg = styled.img<{ isMobile?: boolean }>`
  margin: ${({ isMobile }) => (isMobile ? "6px 5px 2px 5px" : "0px")};
`;
