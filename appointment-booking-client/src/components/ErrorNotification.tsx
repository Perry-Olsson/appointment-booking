import { FC } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";

export interface ErrorObject {
  error: string;
  message: string;
}

export const ErrorNotification: FC<ErrorObject> = ({ message }) => {
  return <Container>{message}</Container>;
};

const Container = styled(Flex)`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorBackground};
  border: solid 2px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  margin: 10px 20px 30px 20px;
`;
