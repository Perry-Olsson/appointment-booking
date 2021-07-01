import { FC } from "react";
import styled from "styled-components";

interface Props {
  size?: number;
}

export const SuccessMark: FC<Props> = ({ size = 300 }) => {
  return (
    <Container>
      <svg
        id="check"
        version="1.1"
        viewBox="0 0 640 640"
        width={size}
        height={size}
      >
        <CirclePath
          d="M220 320C220 264.81 264.81 220 320 220C375.19 220 420 264.81 420 320C420 375.19 375.19 420 320 420C264.81 420 220 375.19 220 320Z"
          opacity="1"
          fillOpacity="0"
          stroke="#24ff00"
          strokeWidth="11"
          strokeOpacity="1"
        ></CirclePath>
        <CheckPath
          d="M267 323.25C288.91 345.47 302.61 359.36 308.09 364.91C308.49 365.32 309.16 365.27 309.5 364.82C309.06 365.39 329.78 337.79 371.65 282"
          opacity="1"
          fillOpacity="0"
          stroke="#24ff00"
          strokeWidth="11"
          strokeOpacity="1"
        ></CheckPath>
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
  stroke-dasharray: 628;
  stroke-dashoffset: 628;
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
