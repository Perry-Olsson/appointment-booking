import { AppProps } from "next/app";
import {
  createGlobalStyle,
  CSSProperties,
  ThemeProvider,
} from "styled-components";
import { NavBar } from "../app/NavBar/NavBar";
import { theme } from "../components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar />
        <div style={componentContainerStyles}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </div>
  );
}

const componentContainerStyles: CSSProperties = {
  zIndex: -1,
  position: "relative",
  top: theme.navBar.height,
};
