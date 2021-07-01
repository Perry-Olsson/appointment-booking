import React from "react";
import styled from "styled-components";

export const Flex: React.FC<
  Omit<React.HTMLProps<HTMLDivElement>, "ref" | "as">
> = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
