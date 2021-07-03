import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useIsOpen } from "../../components";

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
    <Link href={href}>
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
        style={isFirst ? { borderTop: "solid 1px" } : undefined}
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
      style={isFirst ? { borderTop: "solid 1px" } : undefined}
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
  font-size: ${({ theme }) => theme.font.med};
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

const BurgerAnchor = styled.a`
  font-size: ${({ theme }) => theme.font.med_lg};
  cursor: pointer;
`;

const BurgerItemContainer = styled.div`
  border-bottom: solid 1px;
  padding: 0.5rem 0;
  &:active {
    background: #575b6b;
  }
`;
