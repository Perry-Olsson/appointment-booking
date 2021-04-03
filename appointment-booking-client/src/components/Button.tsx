import styled from "styled-components";

export const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className,
}) => {
  return (
    <BaseButton onClick={handleClick} className={className}>
      {text}
    </BaseButton>
  );
};

const BaseButton = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 5px;
  color: white;
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

interface ButtonProps {
  handleClick: () => void;
  text: string;
  className?: string;
}
