import NextLink from "next/link";
import React from "react";

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  disable,
  ...restProps
}) => {
  return disable ? (
    <span {...restProps}>{children}</span>
  ) : (
    <NextLink href={href}>{children}</NextLink>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
  disable?: boolean;
  restProps?: React.HTMLAttributes<any>;
}
