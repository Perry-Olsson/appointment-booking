import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { LeftArrow, Link } from "../../../../../../components";
import { nowAtom } from "../../../../atoms";
import { useHandleUrlParam } from "../../../hooks";
import { NavigatorBox } from "./NavigatorBox";
import { ArrowProps, NavigationType } from "./types";

const disable = (type: NavigationType, day: Date, today: Date): boolean => {
  if (type === "day") {
    return day.valueOf() === today.valueOf();
  } else {
    return (
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }
};

export const Previous: React.FC<ArrowProps> = ({ type }) => {
  const [{ today }] = useAtom(nowAtom);
  const day = useHandleUrlParam();
  const href =
    type === "day"
      ? day.getPreviousDay().toJSON()
      : day.getPreviousMonth().toJSON();

  return (
    <Link href={href} disable={disable(type, day, today)}>
      <Container>
        <LeftArrow />
      </Container>
    </Link>
  );
};

const Container = styled(NavigatorBox)`
  border-right: solid 1px;
  cursor: pointer;
`;
