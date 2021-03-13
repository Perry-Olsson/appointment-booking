import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface TabProps {
  children: React.ReactText;
  href: string;
}

export const Tab: React.FC<TabProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <StyledAnchor>{children}</StyledAnchor>
    </Link>
  );
};

const StyledAnchor = styled.a`
  margin: 0 1rem;
  font-size: ${({ theme }) => theme.font.med};
  cursor: pointer;
`;
