import { useAtom } from "jotai";
import styled from "styled-components";
import { device } from "../../../components";
import { dimensionsAtom } from "../atoms";
import { AppointmentForm, AppointmentFormProps } from "./AppointmentForm";

export const MobileAppointmentForm: React.FC<AppointmentFormProps> = props => {
  const [{ width }] = useAtom(dimensionsAtom);

  return device.isNotWideScreen(width) ? (
    <StyledAppointmentForm {...props} />
  ) : null;
};

const StyledAppointmentForm = styled(AppointmentForm)`
  position: absolute;
  top: ${({ theme }) => theme.dayView.headerOffsetPixels};
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
  height: ${({ theme }) =>
    `${
      window.innerHeight -
      theme.dayView.headerOffset -
      theme.dayView.footerOffset
    }px`};
  border: solid 2px gray;
  border-radius: 3px;
  padding-top: 20px;
  overflow-y: scroll;
`;
