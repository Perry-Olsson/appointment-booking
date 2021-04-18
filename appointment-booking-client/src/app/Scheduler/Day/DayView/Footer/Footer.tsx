import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../../components";
import { DateString } from "../components";
import { Navigator } from "../components";

export const Footer: React.FC = () => {
  return (
    <Container>
      <StyledNavigator type="day">
        <DateString />
      </StyledNavigator>
    </Container>
  );
};

const Container = styled(Flex)`
  width: 100%;
  height: ${({ theme }) => theme.dayView.footerHeight};
  background-color: ${({ theme }) => theme.colors.shadeGray};
`;

const StyledNavigator = styled(Navigator)`
  height: 75%;
  width: 60vw;
  max-width: 400px;
`;
