import { AppProps } from "next/app";
import { NavBar } from "../app/NavBar/NavBar";
import { NavBarOffset } from "../app/NavBar/NavBarOffset";
import { getLayoutProvider, GlobalProviders } from "../context";
import { AccessToken } from "../utils/accessToken";
import { useDimensions } from "../hooks";
import "../utils/date.extensions";
import { UnexpectedErrorDisplay } from "../components/UnexpectedErrorDisplay";

export const accessToken = new AccessToken();

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = getLayoutProvider(Component.displayName);
  useDimensions();

  return (
    <GlobalProviders>
      <UnexpectedErrorDisplay />
      <NavBar />
      <NavBarOffset>
        {getLayout(<Component {...pageProps}></Component>)}
      </NavBarOffset>
    </GlobalProviders>
  );
}
