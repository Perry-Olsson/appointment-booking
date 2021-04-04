import styled from "styled-components";
import { Flex } from "../../../../components";
import { CreateAppointment } from "./CreateAppointment";

export const TabletMobileCreateAppointment: React.FC = () => {
  return (
    <Flex>
      <StyledCreateAppointmentButton
        handleClick={() => console.log("tablet mobile create appointment")}
      />
    </Flex>
  );
};

const StyledCreateAppointmentButton = styled(CreateAppointment)`
  padding: 10px;
`;
