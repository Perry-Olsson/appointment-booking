import { useAtom } from "jotai";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { showAppointmentsFormAtom } from "../../atoms";
import { CreateAppointment } from "./CreateAppointment";

export const TabletMobileCreateAppointment: React.FC = () => {
  const [, setShowForm] = useAtom(showAppointmentsFormAtom);

  return (
    <Flex>
      <StyledCreateAppointmentButton
        handleClick={() => setShowForm(prev => !prev)}
      />
    </Flex>
  );
};

const StyledCreateAppointmentButton = styled(CreateAppointment)`
  padding: 10px;
`;
