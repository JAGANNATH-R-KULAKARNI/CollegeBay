import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "./theme";
import * as Colors from "../utils/Colors";
import createEmotionCache from "./createEmotionCache";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import store from "../utils/redux/Store";
import { Provider } from "react-redux";
import NavBar from "../components/home/NavBar";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import NavBarForAuth from "../components/auth/NavBarForAuth";
import { useRouter } from "next/router";
import * as c from "../utils/Colors";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs    /nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <Provider store={store}>
        <div style={{ backgroundColor: c.c2 }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {router.pathname == "/auth/signin" ||
            router.pathname == "/auth/signup" ? (
              <NavBarForAuth />
            ) : (
              <NavBar />
            )}
            <br />
            <br />

            <Component {...pageProps} />
            <Box sx={{ bgcolor: c.c2, p: 6 }} component="footer"></Box>
          </ThemeProvider>
        </div>
      </Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
