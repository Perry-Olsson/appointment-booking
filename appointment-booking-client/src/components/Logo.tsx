import React, { FC } from "react";
import styled from "styled-components";
import { Flex } from ".";

interface Props {
  size?: string;
  className?: string;
}

export const Logo: FC<Props> = ({ size = "200px", ...restProps }) => {
  return (
    <Container {...restProps}>
      <img src="/logo.png" alt="logo" width={size} />
    </Container>
  );
};

const Container = styled(Flex)`
  padding: 50px 0;
`;
