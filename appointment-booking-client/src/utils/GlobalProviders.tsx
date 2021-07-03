import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { HeadTags, theme } from "../components";
import { UserProvider } from "../context";

const queryClient = new QueryClient();

export const GlobalProviders: React.FC = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HeadTags />
        <GlobalStyle />
        <UserProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    color: #464646;
    font-family: 'Montserrat', sans-serif;
  }

  
/* REACT BURGER MENU */
  /* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 30px;
  height: 25px;
  left: 19px;
  top: 19px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #dadada;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  padding-top: 3rem;
  color: #b8b7ad;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}

/* REACT PHONE NUMBER INPUT*/
.PhoneInputInput {
  border: solid 1px ${theme.colors.lightGray};
  border-radius: 4px;
  height: ${theme.form.height};  
  font-size: ${theme.font.sm_med};
  padding: 5px;
}
`;
