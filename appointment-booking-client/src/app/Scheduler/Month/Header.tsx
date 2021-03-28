import { months } from "../../../constants";

export const Header: React.FC<HeaderProps> = ({ month }) => {
  return <h1>{months[month]}</h1>;
};

interface HeaderProps {
  month: number;
}
