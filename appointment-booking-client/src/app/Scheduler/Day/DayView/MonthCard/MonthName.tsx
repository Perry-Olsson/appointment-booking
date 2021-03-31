import styled from "styled-components";
import { DayProps } from "../../type";

export const MonthName: React.FC<DayProps> = ({ day }) => {
  return <Container>{day.getMonthCardString()}</Container>;
};

const Container = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
`;
