import React from "react";
import styled from "styled-components";

interface DayProps {
  date: Date;
  last: boolean;
}

export const Day: React.FC<DayProps> = ({ date, last }) => {
  const day = date.getDate();

  const handleClick = () => {
    confirm(`Book appointment for ${date.toLocaleDateString()}`);
  };

  return (
    <Container date={date} day={day} last={last} onClick={handleClick}>
      <div>{day}</div>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  border-top: ${({ day }) => getBorder(day, "top")};
  border-right: solid;
  border-bottom: solid;
  border-left: ${({ day }) => getBorder(day, "left")};
  border-top-left-radius: ${({ day }) => getBorder(day, "topLeft")};
  border-top-right-radius: ${({ day }) => getBorder(day, "topRight")};
  border-bottom-left-radius: ${({ day }) => getBorder(day, "bottomLeft")};
  border-bottom-right-radius: ${({ day, last }) =>
    last ? "4px" : getBorder(day, "bottomRight")};
`;

interface ContainerProps {
  day: number;
  last: boolean;
  date: Date;
}

const getBorder = (date: number, side: string) => {
  const border = "solid";
  const radius = "4px";
  if (
    side === "left" &&
    (date === 1 || date === 8 || date === 15 || date === 22 || date === 29)
  )
    return border;
  else if (side === "top" && date > 0 && date < 8) return border;
  else if (side === "bottomRight" && date === 28) return radius;
  else if (side === "topLeft" && date == 1) return radius;
  else if (side === "topRight" && date === 7) return radius;
  else if (side === "bottomLeft" && date === 29) return radius;
  return "";
};
