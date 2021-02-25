import React from "react";
import { Flex } from "../../components";

export const Day: React.FC<DayProps> = ({ day }) => {
  return <Flex>{day.getDate()}</Flex>;
};

interface DayProps {
  day: Date;
}
