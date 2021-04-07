import styled from "styled-components";

export const Select = styled.select`
  display: flex;
  border: solid 1px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  height: ${({ theme }) => theme.form.height};
  width: 100%;
  padding: 5px;
  font-size: ${({ theme }) => theme.font.sm_med};
`;

export const TextArea = styled.textarea`
  display: flex;
  border: solid 1px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
  height: 150px;
  padding: 5px;
  font-size: ${({ theme }) => theme.font.sm_med};
  resize: none;
`;

export const Label = styled.label`
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.span`
  font-weight: normal;
  color: red;
`;
