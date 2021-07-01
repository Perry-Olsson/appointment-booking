import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../../components";
import { useDay } from "../../context";
import { DateString } from "../components";
import { Navigator } from "../components";

export const Footer: React.FC = () => {
  const day = useDay();

  return (
    <Container>
      <DayString>{day.getDayString()}</DayString>
      <StyledNavigator type="day">
        <DateString />
      </StyledNavigator>
    </Container>
  );
};

const DayString = styled.h4`
  font-size: ${({ theme }) => theme.font.sm_med};
  font-weight: bold;
  padding: 6px;
`;

const Container = styled(Flex)`
  width: 100%;
  height: ${({ theme }) => theme.dayView.footerHeight};
  background-color: ${({ theme }) => theme.colors.shadeGray};
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  bottom: 0;
`;

const StyledNavigator = styled(Navigator)`
  height: 55%;
  width: 60vw;
  max-width: 400px;
`;
