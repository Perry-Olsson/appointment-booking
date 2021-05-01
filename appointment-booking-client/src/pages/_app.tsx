import { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NavBar } from "../app/NavBar/NavBar";
import { NavBarOffset } from "../app/NavBar/NavBarOffset";
import { theme } from "../components";
import { Auth, getLayoutProvider } from "../utils";
import { HeadTags } from "../components/HeadTags";
import "../utils/date.extensions";
import { useDimensions } from "../hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { User } from "../context";

const queryClient = new QueryClient();
export const auth = new Auth();

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = getLayoutProvider(Component.displayName);
  useDimensions();

  return (
    <QueryClientProvider client={queryClient}>
      <User>
        <HeadTags />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <NavBar />
          <NavBarOffset />
          {getLayout(<Component {...pageProps}></Component>)}
        </ThemeProvider>
      </User>
    </QueryClientProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

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

`;
