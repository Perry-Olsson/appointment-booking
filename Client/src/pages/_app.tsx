import { AppProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
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
        <ComponentContainer>
          <Component {...pageProps} />
        </ComponentContainer>
      </ThemeProvider>
    </div>
  );
}

const ComponentContainer = styled.div`
  z-index: -1;
  position: relative;
  top: ${({ theme }) => theme.navBar.height};
`;
