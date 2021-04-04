import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../../components";
import { TabletMobileCreateAppointment } from "../../../AppointmentForm";

export const Footer: React.FC = () => {
  return (
    <Container>
      <TabletMobileCreateAppointment />
    </Container>
  );
};

const Container = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${({ theme }) => theme.dayView.footerHeight};
`;
