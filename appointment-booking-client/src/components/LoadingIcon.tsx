import { FC } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";
import ReactLoading from "react-loading";

export const LoadingIcon: FC = () => {
  return (
    <LoadingContainer>
      <ReactLoading type="bars" color="#2222222" height="50px" width="50px" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled(Flex)`
  height: 100%;
`;
