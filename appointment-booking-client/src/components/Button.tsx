import styled from "styled-components";
import { theme } from "./theme";

export const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className,
  hexColor = theme.colors.primaryLight,
}) => {
  return (
    <BaseButton onClick={handleClick} className={className} color={hexColor}>
      {text}
    </BaseButton>
  );
};

const BaseButton = styled.button<{ color: string }>`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  color: white;
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ color }) => `${color}bb`};
    }
  }
`;

interface ButtonProps {
  handleClick?: () => void;
  type?: string;
  text: string;
  className?: string;
  hexColor?: string;
}
