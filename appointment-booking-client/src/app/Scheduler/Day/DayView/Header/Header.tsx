import styled from "styled-components";
import { device } from "../../../../../components";
import { BackButton } from "../../../../../components/BackButton";
import { Navigator } from "./Navigator";
import { DayProps } from "../../type";
import { useAtom } from "jotai";
import { dimensionsAtom } from "../../../atoms";
import { DesktopCreateAppointment } from "../../../AppointmentForm";

export const Header: React.FC<DayProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <StyledBackButton href={"/schedule"} />
      <Navigator day={day} />
      {device.isDesktop(width) ? <DesktopCreateAppointment /> : null}
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
