import React, { FC } from "react";
import styled from "styled-components";
import { ExitButton, Flex } from "../../../../../../components";
import { Cancel } from "../../../components";

interface Props {
  closeModal: () => void;
  showCancelButton?: boolean;
}
export const ContentContainer: FC<Props> = ({
  closeModal,
  children,
  showCancelButton,
}) => (
  <Container>
    <ExitButton size="30px" onClick={() => closeModal()} />
    {children}

    {showCancelButton ? (
      <Cancel text="Close" negative handleClick={() => closeModal()} />
    ) : null}
  </Container>
);

const Container = styled(Flex)`
  margin: auto;
  text-align: center;
`;
