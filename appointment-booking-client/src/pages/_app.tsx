import { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NavBar } from "../app/NavBar/NavBar";
import { NavBarOffset } from "../app/NavBar/NavBarOffset";
import { theme } from "../components";
import { getLayoutProvider } from "../utils";
//todo refactor navbar offset
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = getLayoutProvider(Component.displayName);

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar />
        <NavBarOffset />
        {getLayout(<Component {...pageProps}></Component>)}
      </ThemeProvider>
    </div>
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
`;
