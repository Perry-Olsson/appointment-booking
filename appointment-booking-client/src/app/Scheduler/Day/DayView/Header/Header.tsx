import styled from "styled-components";
import { device, Flex } from "../../../../../components";
import { BackButton } from "../../../../../components/BackButton";
import { Navigator } from "./Navigator";
import { DayProps } from "../../type";
import { CreateAppointment } from "../../../AppointmentForm";
import { useAtom } from "jotai";
import { dimensionsAtom } from "../../../atoms";

export const Header: React.FC<DayProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <StyledBackButton href={"/schedule"} />
      <Navigator day={day} />
      {device.isDesktop(width) ? <DeskTopCreateAppointment /> : null}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  height: ${({ theme }) => theme.dayView.headerHeight};
`;

const StyledBackButton = styled(BackButton)`
  cursor: pointer;
`;

const StyledCreateAppointment = styled(CreateAppointment)`
  padding: 10px;
  width: fit-content;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLightFaded};
    }
  }
`;

const DeskTopCreateAppointment: React.FC = () => {
  return (
    <Flex>
      <StyledCreateAppointment
        handleClick={() => console.log("desktop create appointment")}
      />
    </Flex>
  );
};
