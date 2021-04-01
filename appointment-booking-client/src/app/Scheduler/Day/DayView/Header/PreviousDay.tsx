import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { LeftArrow } from "../../../../../components";
import { useHandleUrlParam } from "../../hooks";
import { NavigatorBox } from "./components";

export const PreviousDay: React.FC = () => {
  const day = useHandleUrlParam();

  return (
    <Link href={day.getPreviousDay().toJSON()}>
      <Container>
        <LeftArrow />
      </Container>
    </Link>
  );
};

const Container = styled(NavigatorBox)`
  border-right: solid 1px;
`;
