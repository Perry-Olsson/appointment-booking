import { FC } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";

export interface ErrorObject {
  error: string;
  message: string;
}

export const ErrorNotification: FC<ErrorObject> = ({ error, message }) => {
  return <Container>{message}</Container>;
};

const Container = styled(Flex)`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorBackground};
`;
