import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { RightArrow } from "../../../../../components";
import { useHandleUrlParam } from "../../hooks";
import { NavigatorBox } from "./components";

export const NextDay: React.FC = () => {
  const day = useHandleUrlParam();

  return (
    <Link href={day.getNextDay().toJSON()}>
      <Container>
        <RightArrow />
      </Container>
    </Link>
  );
};

const Container = styled(NavigatorBox)`
  border-left: solid 1px;
`;
