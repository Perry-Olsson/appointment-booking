import styled from "styled-components";

export const LeftArrow: React.FC<ArrowProps> = ({ size = 10 }) => {
  return <Left size={size} />;
};

export const RightArrow: React.FC<ArrowProps> = ({ size = 10 }) => {
  return <Right size={size} />;
};

const Left = styled.div<Required<ArrowProps>>`
  width: 0;
  height: 0;
  border-top: ${({ size }) => `${size}px solid transparent`};
  border-bottom: ${({ size }) => `${size}px solid transparent`};
  border-right: ${({ theme, size }) => `${size}px solid ${theme.colors.gray}`};
  position: relative;
  right: ${({ size }) => `${size / 5}px`};
`;
const Right = styled.div<Required<ArrowProps>>`
  width: 0;
  height: 0;
  border-top: ${({ size }) => `${size}px solid transparent`};
  border-bottom: ${({ size }) => `${size}px solid transparent`};
  border-left: ${({ theme, size }) => `${size}px solid ${theme.colors.gray}`};
  position: relative;
  left: ${({ size }) => `${size / 5}px`};
`;

interface ArrowProps {
  size?: number;
}
