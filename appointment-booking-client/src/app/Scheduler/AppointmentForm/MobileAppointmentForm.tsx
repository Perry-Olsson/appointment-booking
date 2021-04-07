import styled from "styled-components";
import { AppointmentForm, AppointmentFormProps } from "./AppointmentForm";

export const MobileAppointmentForm: React.FC<AppointmentFormProps> = props => {
  return <StyledAppointmentForm {...props} />;
};

const StyledAppointmentForm = styled(AppointmentForm)`
  position: absolute;
  z-index: 1000;
  background-color: white;
  top: ${({ theme }) => `${theme.dayView.headerOffset}px`};
  bottom: ${({ theme }) => theme.dayView.footerHeight};
  right: 0;
  left: 0;
  border: solid 2px gray;
  border-radius: 3px;
  padding-top: 20px;
`;
