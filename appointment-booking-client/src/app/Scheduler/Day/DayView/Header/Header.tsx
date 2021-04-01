import styled from "styled-components";
import { Flex } from "../../../../../components";
import { BackButton } from "../../../../../components/BackButton";
import { Navigator } from "./Navigator";
import { DayProps } from "../../type";

export const Header: React.FC<DayProps> = ({ day }) => {
  return (
    <Container>
      <StyledBackButton href={"/schedule"} />
      <Navigator day={day} />
    </Container>
  );
};

const StyledBackButton = styled(BackButton)`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const Container = styled(Flex)`
  width: 100%;
  height: ${({ theme }) => theme.dayView.headerHeight};
`;
