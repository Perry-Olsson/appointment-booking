import { months } from "../../../constants";
import { useNow } from "../../../context";

export const Header: React.FC = () => {
  const now = useNow();
  return <h1>{months[now.getMonth()].name}</h1>;
};
