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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      {children}
    </Head>
  );
};

interface HeadTagsProps {
  children?: React.ReactNode;
}
