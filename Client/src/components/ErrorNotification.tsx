import { FC } from "react";
import styled from "styled-components";
import { Flex2 } from "./Flex";

export interface ErrorObject extends React.HTMLAttributes<HTMLDivElement> {
  error: string;
  message: string;
}

export const ErrorNotification: FC<ErrorObject> = ({
  message,
  children,
  className,
}) => {
  return (
    <Container className={className}>
      {message}
      {children}
    </Container>
  );
};

const Container = styled(Flex2)`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorBackground};
  border: solid 2px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
`;
