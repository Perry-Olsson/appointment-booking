import { monthString } from "../../../constants";

export const Header: React.FC<HeaderProps> = ({ month }) => {
  return <h1>{monthString[month]}</h1>;
};

interface HeaderProps {
  month: number;
}
