import styled from "styled-components";
import { Flex } from "../../../../../components";
import { DayProps } from "../../type";
import { Navigator } from "../components";

export const Navigation: React.FC<DayProps> = ({ day }) => {
  return (
    <Container>
      <StyledNavigator type="month">{day.getMonthCardString()}</StyledNavigator>
    </Container>
  );
};

const Container = styled(Flex)`
  width: 100%;
`;
const StyledNavigator = styled(Navigator)`
  text-align: center;
  margin-bottom: 1rem;
  height: 30px;
  width: 75%;
  font-weight: bold;
  font-size: 14px;
`;
