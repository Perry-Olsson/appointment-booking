import styled from "styled-components";
import { device } from "../../../../../components";
import { BackButton } from "../../../../../components/BackButton";
import { DayProps } from "../../type";
import { useAtom } from "jotai";
import { dimensionsAtom } from "../../../atoms";
import {
  DesktopCreateAppointment,
  TabletMobileCreateAppointment,
} from "../../../AppointmentForm";
import { DateString } from "../components";

export const Header: React.FC<DayProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <StyledBackButton href={"/schedule"} />
      {device.isDesktop(width) ? (
        <Desktop day={day} />
      ) : (
        <TabletMobileCreateAppointment />
      )}
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

const Desktop: React.FC<DayProps> = ({ day }) => {
  return (
    <>
      <DateString day={day} />
      <DesktopCreateAppointment />
    </>
  );
};
