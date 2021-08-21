import { GlobalStyle } from "../context";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { FC, ReactElement } from "react";
import { theme } from "../components";
import { render, RenderOptions } from "@testing-library/react";
import renderer from "react-test-renderer";
import { UserProvider } from "../context";

const Providers: FC = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <UserProvider>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });

const customSnapRenderer = (component: ReactElement) => {
  return renderer.create(<Providers>{component}</Providers>);
};

export * from "@testing-library/react";
export { customRender as render, customSnapRenderer };
