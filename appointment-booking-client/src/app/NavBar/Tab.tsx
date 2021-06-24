import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useIsOpen } from "../../components";

interface TabProps {
  children: React.ReactText;
  href: string;
  isFirst?: boolean;
}

export const Tab: React.FC<TabProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <StyledAnchor>{children}</StyledAnchor>
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

const StyledAnchor = styled.a`
  margin: 0 1rem;
  font-size: ${({ theme }) => theme.font.med};
  cursor: pointer;
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
