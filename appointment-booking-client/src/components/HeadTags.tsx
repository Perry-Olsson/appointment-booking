import Head from "next/head";
import React from "react";

export const HeadTags: React.FC<HeadTagsProps> = ({ children }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"
      />
      <meta name="description" content="An online scheduling application MVP" />
      <meta name="author" content="Perry Olsson" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      {children}
    </Head>
  );
};

interface HeadTagsProps {
  children?: React.ReactNode;
}
