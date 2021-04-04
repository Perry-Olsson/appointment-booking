import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { Link, RightArrow } from "../../../../../../components";
import { monthsAtom } from "../../../../atoms";
import { useHandleUrlParam } from "../../../hooks";
import { NavigatorBox } from "./NavigatorBox";
import { ArrowProps, NavigationType } from "./types";

const disable = (type: NavigationType, day: Date, cursor: Date): boolean => {
  if (type === "day") {
    return day.valueOf() === cursor.getPreviousDay().valueOf();
  } else {
    const previousMonth = cursor.getPreviousMonth();
    return (
      day.getFullYear() === previousMonth.getFullYear() &&
      day.getMonth() === previousMonth.getMonth()
    );
  }
};

export const Next: React.FC<ArrowProps> = ({ type }) => {
  const [{ cursor }] = useAtom(monthsAtom);
  const day = useHandleUrlParam();
  const href =
    type === "day" ? day.getNextDay().toJSON() : day.getNextMonth().toJSON();

  return (
    <Link href={href} disable={disable(type, day, cursor)}>
      <Container>
        <RightArrow />
      </Container>
    </Link>
  );
};

const Container = styled(NavigatorBox)`
  border-left: solid 1px;
  cursor: pointer;
`;
