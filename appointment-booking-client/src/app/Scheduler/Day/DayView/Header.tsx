import { useAtom } from "jotai";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { BackButton } from "../../../../components/BackButton";
import { device } from "../../../../components/device";
import { dayString, monthString } from "../../../../constants";
import { dimensionsAtom } from "../../atoms";

export const Header: React.FC<HeaderProps> = ({ day }) => {
  const [{ width }] = useAtom(dimensionsAtom);
  return (
    <Container>
      <StyledBackButton />
      <h2>{getDateString(day, width)}</h2>
    </Container>
  );
};

const getDateString = (day: Date, screenWidth: number) => {
  return device.isTabletOrSmaller(screenWidth)
    ? `${monthString[day.getMonth()].slice(
        0,
        3
      )}. ${day.getDate()}, ${day.getFullYear()}`
    : `${dayString[day.getDay()]} ${day.getMonth() + 1}/${day.getDate()}`;
};

interface HeaderProps {
  day: Date;
}

const StyledBackButton = styled(BackButton)`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const Container = styled(Flex)`
  width: 100%;
  height: ${({ theme }) => theme.dayView.headerHeight};
`;
