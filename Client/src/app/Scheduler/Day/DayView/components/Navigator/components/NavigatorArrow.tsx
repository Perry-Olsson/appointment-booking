import styled from "styled-components";

export const NavigatorArrow = styled.a<{ isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: ${({ isDisabled }) => (isDisabled ? null : "pointer")};
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.lightGray : null};
`;
