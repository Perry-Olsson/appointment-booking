import React from "react";

interface DayProps {
  day: Date;
}

export const Day: React.FC<DayProps> = ({ day }) => {
  return <div>Hello world this is the date: {day.toLocaleDateString()}</div>;
};
