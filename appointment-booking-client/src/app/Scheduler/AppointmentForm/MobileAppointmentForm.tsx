import styled from "styled-components";
import { AppointmentForm, AppointmentFormProps } from "./AppointmentForm";

export const MobileAppointmentForm: React.FC<AppointmentFormProps> = props => {
  return <StyledAppointmentForm {...props} />;
};

const StyledAppointmentForm = styled(AppointmentForm)`
  position: fixed;
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
