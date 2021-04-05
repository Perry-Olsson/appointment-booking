import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { showAppointmentsFormAtom } from "../../atoms";
import { CreateAppointment } from "./CreateAppointment";

export const DesktopCreateAppointment: React.FC = () => {
  const [, setShowForm] = useAtom(showAppointmentsFormAtom);
  return (
    <Flex>
      <StyledCreateAppointment handleClick={() => setShowForm(prev => !prev)} />
    </Flex>
  );
};

const StyledCreateAppointment = styled(CreateAppointment)`
  width: fit-content;
`;
