import { MonthProps } from "./types";

export const Header: React.FC<MonthProps> = ({ days }) => {
  return <h1>{days[0].getMonthString()}</h1>;
};
