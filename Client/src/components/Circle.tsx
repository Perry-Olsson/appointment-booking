import styled from "styled-components";
import { Flex2 } from "./Flex";

export const Circle = styled(Flex2)<{ size?: string }>`
  width: ${({ size }) => (size ? size : "60px")};
  height: ${({ size }) => (size ? size : "60px")};
  border-radius: 50%;
  border: solid 1px;
`;
