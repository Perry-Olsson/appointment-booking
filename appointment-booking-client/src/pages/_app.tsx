import { AppProps } from "next/app";
import { NavBar } from "../app/NavBar/NavBar";
import { NavBarOffset } from "../app/NavBar/NavBarOffset";
import { AccessToken, getLayoutProvider, GlobalProviders } from "../utils";
import { useDimensions } from "../hooks";
import "../utils/date.extensions";

export const accessToken = new AccessToken();

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = getLayoutProvider(Component.displayName);
  useDimensions();

  return (
    <GlobalProviders>
      <NavBar />
      <NavBarOffset />
      {getLayout(<Component {...pageProps}></Component>)}
    </GlobalProviders>
  );
}
