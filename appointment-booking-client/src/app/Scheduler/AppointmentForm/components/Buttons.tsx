import styled from "styled-components";
import {
  Button,
  device,
  ExitButton,
  Flex,
  theme,
} from "../../../../components";

export const ButtonContainer = styled(Flex)`
  flex-direction: row;
  padding: 30px;
`;

export const ConfirmButton = styled(Button)`
  width: 130px;
`;

export const Cancel = styled(Button)`
  margin-right: 20px;
  border: solid 2px;
  width: 130px;
  color: ${({ theme }) => theme.colors.secondaryLight};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    color: white;
  }
`;

export const HideFormButton = styled(ExitButton)`
  @media (min-width: ${device.desktop.pixels}) {
    top: ${`${theme.dayView.headerOffset + 8}px`};
  }
`;
