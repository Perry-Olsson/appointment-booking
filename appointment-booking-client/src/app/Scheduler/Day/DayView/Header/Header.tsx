import styled from "styled-components";
import { device } from "../../../../../components";
import { BackButton } from "../../../../../components/BackButton";
import { useAtom } from "jotai";
import { dimensionsAtom } from "../../../atoms";
import {
  DesktopCreateAppointment,
  TabletMobileCreateAppointment,
} from "../../../AppointmentForm";
import { DateString } from "../components";

export const Header: React.FC = () => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <StyledBackButton href={"/schedule"} />
      {device.isDesktop(width) ? (
        <Desktop />
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
  @media (max-width: ${device.desktop.largePixels}) {
    position: fixed;
    top: ${({ theme }) => theme.navBar.height};
  }
`;

const StyledBackButton = styled(BackButton)`
  cursor: pointer;
`;

const Desktop: React.FC = () => {
  return (
    <>
      <DateString />
      <DesktopCreateAppointment />
    </>
  );
};
