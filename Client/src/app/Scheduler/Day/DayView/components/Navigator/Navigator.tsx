import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../../../components";
import { Next } from "./Next";
import { Previous } from "./Previous";
import { ArrowProps } from "./types";

export const Navigator: React.FC<NavigatorProps> = ({
  type,
  children,
  className,
}) => {
  return (
    <Container className={className}>
      <Previous type={type} />
      {children}
      <Next type={type} />
    </Container>
  );
};

interface NavigatorProps extends ArrowProps {
  children: React.ReactNode;
  className?: string;
}

const Container = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  border: solid 1px;
  border-radius: 2px;
`;
