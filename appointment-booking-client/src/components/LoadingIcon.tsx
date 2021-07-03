import { FC } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";
import ReactLoading, { LoadingProps } from "react-loading";
import { theme } from "./theme";

export const LoadingIcon: FC<LoadingProps> = ({
  className,
  type = "bars",
  color = theme.colors.primary,
  height = "50px",
  width = "50px",
  ...props
}) => {
  return (
    <LoadingContainer className={className}>
      <ReactLoading
        type={type}
        color={color}
        height={height}
        width={width}
        {...props}
      />
    </LoadingContainer>
  );
};

const LoadingContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;
