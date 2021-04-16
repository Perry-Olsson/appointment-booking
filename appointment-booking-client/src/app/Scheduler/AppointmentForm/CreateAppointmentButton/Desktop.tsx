import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { showAppointmentsFormAtom } from "../../atoms";
import { useDay } from "../../Day/context/DayProvider";
import { CreateAppointment } from "./CreateAppointment";

export const DesktopCreateAppointment: React.FC = () => {
  const day = useDay();
  const [, setShowForm] = useAtom(showAppointmentsFormAtom);

  return (
    <Flex>
      <StyledCreateAppointment
        handleClick={() => setShowForm(prev => !prev)}
        day={day}
      />
    </Flex>
  );
};

const StyledCreateAppointment = styled(CreateAppointment)`
  width: fit-content;
`;
