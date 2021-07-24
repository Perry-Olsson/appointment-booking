import React from "react";
import styled from "styled-components";
import { theme } from "./theme";

export const LinkButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { text, className, negative, hexColor = theme.colors.primary, ...props },
    ref
  ) => {
    console.log(className);
    return (
      <BaseButton
        as="a"
        ref={ref}
        className={className}
        color={hexColor}
        negative={negative || false}
        {...props}
      >
        {text}
      </BaseButton>
    );
  }
);

const BaseButton = styled.button<{ color: string; negative: boolean }>`
  padding: 10px;
  color: ${({ color, negative }) => (negative ? color : "white")};
  background-color: ${({ color, negative }) => (negative ? "white" : color)};
  border: solid 2px ${({ color }) => color};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  &:focus {
    outline: none;
  }
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      background-color: ${({ theme }) => theme.colors.primaryMisted};
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className,
  negative,
  hexColor = theme.colors.primary,
  ...props
}) => {
  return (
    <BaseButton
      onClick={handleClick}
      className={className}
      color={hexColor}
      negative={negative || false}
      {...props}
    >
      {text}
    </BaseButton>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  text: string;
  className?: string;
  hexColor?: string;
  negative?: boolean;
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  className?: string;
  hexColor?: string;
  negative?: boolean;
}
