import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { theme, useIsOpen } from "../../components";

interface TabProps {
  href: string;
  onClick?: () => void;
  isFirst?: boolean;
  isSelected?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  onClick,
  children,
  href,
  isSelected,
}) => {
  return (
    <Link href={href} passHref>
      <StyledAnchor onClick={onClick} isSelected={isSelected}>
        {children}
      </StyledAnchor>
    </Link>
  );
};

export const BurgerTab: React.FC<TabProps> = ({ children, href, isFirst }) => {
  const setIsOpen = useIsOpen();

  return (
    <Link href={href}>
      <BurgerItemContainer
        className="menu-item"
        style={
          isFirst
            ? { borderTop: `solid 2px ${theme.colors.textSecondary}` }
            : undefined
        }
        onClick={() => setIsOpen(false)}
      >
        <BurgerAnchor>{children}</BurgerAnchor>
      </BurgerItemContainer>
    </Link>
  );
};

export const BurgerButton: React.FC<{
  isFirst?: boolean;
  handleClick: () => void;
}> = ({ children, handleClick, isFirst }) => {
  const setIsOpen = useIsOpen();

  return (
    <BurgerItemContainer
      className="menu-item"
      style={
        isFirst
          ? { borderTop: `solid 2px ${theme.colors.textSecondary}` }
          : undefined
      }
      onClick={() => {
        setIsOpen(false);
        handleClick();
      }}
    >
      <BurgerAnchor>{children}</BurgerAnchor>
    </BurgerItemContainer>
  );
};

const StyledAnchor = styled.a<{ isSelected: boolean | undefined }>`
  font-size: ${({ theme }) => theme.font.sm_med};
  cursor: pointer;
  transition: color 0.1s;
  transition: background-color 0.1s;
  position: relative;
  z-index: 6;
  width: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
  margin-top: 3px;
  margin-right: 1px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  @media (hover: hover) {
    :hover {
      color: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

const BurgerItemContainer = styled.div`
  border-bottom: solid 2px ${({ theme }) => theme.colors.textSecondary};
  padding: 0.5rem 0.3rem;
  &:active {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const BurgerAnchor = styled.a`
  font-size: ${({ theme }) => theme.font.med_lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  ${BurgerItemContainer}:active & {
    color: ${({ theme }) => theme.colors.primary}!important;
  }
`;
