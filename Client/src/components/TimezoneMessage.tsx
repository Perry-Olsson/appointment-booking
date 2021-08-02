import { FC } from "react";
import styled from "styled-components";
import { device } from ".";

interface Props {
  className?: string;
}

export const TimezoneMessage: FC<Props> = ({ className }) => {
  if (new Date().getTimezoneOffset() === 420) return null;
  return (
    <Container className={className}>
      All Appointments are displayed and scheduled in US Pacific Time
    </Container>
  );
};

export const StyledTimezoneMessage = styled(TimezoneMessage)`
  position: fixed;
  bottom: ${({ theme }) => theme.dayView.footerHeight};
  width: 100%;
  text-align: center;
  background-color: white;
  @media (min-width: ${device.desktop.largePixels}) {
    bottom: 0;
    left: 0;
    width: 25%;
  }
`;

const Container = styled.div``;
