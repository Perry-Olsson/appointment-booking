import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import { Flex } from "./Flex";

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  disable,
  ...restProps
}) => {
  return disable ? (
    <Container {...restProps}>{children}</Container>
  ) : (
    <NextLink href={href}>{children}</NextLink>
  );
};

const Container = styled(Flex)`
  height: 100%;
  width: 100%;
`;

interface LinkProps {
  href: string;
  children: React.ReactNode;
  disable?: boolean;
  restProps?: React.HTMLAttributes<any>;
}
