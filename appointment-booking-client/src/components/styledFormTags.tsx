import styled from "styled-components";
import { Button } from "./Button";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
`;

export const Input = styled.input`
  display: flex;
  border: solid 1px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.primary};
  height: ${({ theme }) => theme.form.height};
  width: 100%;
  padding: 5px;
  font-size: ${({ theme }) => theme.font.sm_med};
  margin-top: 3px;
`;

export const Select = styled.select`
  display: flex;
  border: solid 1px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  height: ${({ theme }) => theme.form.height};
  width: 100%;
  padding: 5px;
  font-size: ${({ theme }) => theme.font.sm_med};
  margin-top: 3px;
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
  margin-top: 3px;
`;

export const FormButton = styled(Button)`
  padding: 10px 30px;
  margin: 20px auto;
  font-weight: bold;
`;

export const AuthFormButton = styled(FormButton)`
  width: 80%;
  max-width: 300px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.form.fieldMaxWidth};
  font-weight: bold;
`;

export const AuthLabel = styled(Label)`
  color: white;
`;

export const ErrorText = styled.span`
  font-weight: normal;
  color: red;
`;

export const DefaultOption: React.FC = () => {
  return (
    <option disabled value="">
      {" "}
      -- Select an option --{" "}
    </option>
  );
};

export const Seperator = styled.div`
  height: 20px;
  border: solid;
  border-color: #ffffff00;
`;
