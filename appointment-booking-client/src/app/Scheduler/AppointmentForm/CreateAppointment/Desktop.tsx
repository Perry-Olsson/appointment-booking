import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { CreateAppointment } from "./CreateAppointment";

export const DesktopCreateAppointment: React.FC = () => {
  return (
    <Flex>
      <StyledCreateAppointment
        handleClick={() => console.log("desktop create appointment")}
      />
    </Flex>
  );
};

const StyledCreateAppointment = styled(CreateAppointment)`
  padding: 10px;
  width: fit-content;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLightFaded};
    }
  }
`;
