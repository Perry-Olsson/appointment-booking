import styled from "styled-components";
import { getMonthString } from "./utils/getMonthString";

export const MonthName: React.FC<MonthNameProps> = ({ month }) => {
  return <Container>{getMonthString(month)}</Container>;
};

interface MonthNameProps {
  month: Date[];
}
const Container = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
`;
