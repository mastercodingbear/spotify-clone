// Global Styling And Fonts Import
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fonts.sass";
import "../styles/global.sass";

// Set REDUX
import store from "../redux/store";
import { Provider } from "react-redux";

// Theme Settings
import { ThemeProvider } from "next-themes";

// Components
import AuthGuard from "../components/AuthGuard";
import AppMain from "../components/AppMain";
import Head from "next/head";

export default function _app({ Component, pageProps }) {
  return (
    // <>APP</>
    <Provider store={store}>
      <Head>
        <meta name="theme-color" content="#1DB954"></meta>
        <title>Spotify App | Enjoy Music</title>
      </Head>
      <ThemeProvider defaultTheme={"dark"} enableSystem={false}>
        <AuthGuard>
          <AppMain>
            <Component {...pageProps} />
          </AppMain>
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  );
}
