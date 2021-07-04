import { FC } from "react";
import styled from "styled-components";

interface Props {
  size?: number;
}

export const SuccessMark: FC<Props> = ({ size = 300 }) => {
  return (
    <Container>
      <svg
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 300 300"
        width={size}
        height={size}
      >
        <CirclePath
          d="M50 150C50 94.81 94.81 50 150 50C205.19 50 250 94.81 250 150C250 205.19 205.19 250 150 250C94.81 250 50 205.19 50 150Z"
          opacity="1"
          fillOpacity="0"
          stroke="#24ff00"
          strokeWidth="10"
          strokeOpacity="1"
        />
        <CheckPath
          d="M97.67 149.66C119.59 171.88 133.29 185.76 138.76 191.32C139.16 191.72 139.83 191.68 140.18 191.22C139.74 191.8 160.46 164.19 202.33 108.4"
          opacity="1"
          fillOpacity="0"
          stroke="#24ff00"
          strokeWidth="11"
          strokeOpacity="1"
        />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const CirclePath = styled.path`
  stroke-dasharray: 640;
  stroke-dashoffset: 640;
  animation: dash 0.8s linear forwards;
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const CheckPath = styled.path`
  stroke-dasharray: 170;
  stroke-dashoffset: 170;
  animation: dash 0.8s linear 0.9s forwards;
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;
