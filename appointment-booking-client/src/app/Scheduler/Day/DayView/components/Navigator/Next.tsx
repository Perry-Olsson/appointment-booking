import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { Link, RightArrow } from "../../../../../../components";
import { monthsAtom } from "../../../../atoms";
import { useHandleUrlParam } from "../../../hooks";
import { ArrowProps, NavigationType } from "./types";
import { NavigatorArrow } from "./components";

export const Next: React.FC<ArrowProps> = ({ type }) => {
  const [{ cursor }] = useAtom(monthsAtom);
  const day = useHandleUrlParam();
  const href =
    type === "day" ? day.getNextDay().toJSON() : day.getNextMonth().toJSON();

  const isDisabled = disable(type, day, cursor);
  return (
    <Link href={href} disable={isDisabled}>
      <Container isDisabled={isDisabled}>
        <RightArrow />
      </Container>
    </Link>
  );
};

const Container = styled(NavigatorArrow)`
  border-left: solid 1px;
  width: 100%;
`;

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
