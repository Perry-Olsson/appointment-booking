import { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NavBar } from "../app/NavBar/NavBar";
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
        <div
          style={{
            position: "relative",
            top: theme.navBar.height,
          }}
        >
          {getLayout(<Component {...pageProps}></Component>)}
        </div>
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
  .ReactModal__Overlay {
  opacity: 0;
  transition: opacity ${theme.modal.transitionTime}ms ease-in-out;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
}
`;
