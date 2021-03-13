import { months } from "../../../constants";

export const Header: React.FC<HeaderProps> = ({ monthIndex }) => {
  return <h1>{months[monthIndex].name}</h1>;
};

interface HeaderProps {
  monthIndex: number;
}
