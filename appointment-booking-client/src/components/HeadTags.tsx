import Head from "next/head";
import React from "react";

export const HeadTags: React.FC<HeadTagsProps> = ({ children }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"
      />
      {children}
    </Head>
  );
};

interface HeadTagsProps {
  children?: React.ReactNode;
}
