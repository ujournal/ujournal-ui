import Head from "next/head";
import i18n from "baza/i18n";
import "../styles/globals.css";
import { I18nextProvider } from "react-i18next";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { LemmyClientContext, lemmyHttpClient } from "baza/hooks/useLemmyClient";
import { LemmyAuthProvider } from "features/app/hooks/useAuth";
import { mantineTheme } from "baza/mantine/theme";
import { SiteAppProps } from "types";
import { NotificationsProvider } from "@mantine/notifications";
import { AppLayout } from "features/app/components/AppLayout";
import { queryClient } from "baza/reactQuery";
import { MenuToggleProvider } from "baza/hooks/useMenuToggle";
import { AppAuthRedirect } from "features/app/components/AppAuthRedirect";
import { LegalNotification } from "features/legal/components/LegalNotification";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useColorSchemeLocalStorage } from "baza/hooks/useColorSchemeLocalStorage";
import { useMemo } from "react";
import Script from "next/script";
import { Global } from "@mantine/core";

export default function App(props: SiteAppProps) {
  const { Component, pageProps } = props;
  const { colorScheme, toggleColorScheme } = useColorSchemeLocalStorage();

  const theme = useMemo(
    () => ({ ...mantineTheme, colorScheme }),
    [colorScheme]
  );

  return (
    <>
      <GoogleAnalytics trackPageViews />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
        `}
      </Script>

      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>

        <link
          href="http://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        />

        <Global
          styles={[
            {
              "@font-face": {
                fontFamily: "eUkraineRegular",
                src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Regular.otf') format("opentype")`,
                fontWeight: 500,
                fontStyle: "normal",
              },
            },
          ]}
        />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`}
        />
        <link
          rel="mask-icon"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/safari-pinned-tab.svg`}
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <NotificationsProvider position="bottom-right">
          <LemmyAuthProvider>
            <LemmyClientContext.Provider value={lemmyHttpClient}>
              <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider
                  colorScheme={colorScheme}
                  toggleColorScheme={toggleColorScheme}
                >
                  <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={theme}
                  >
                    <MenuToggleProvider>
                      <AppLayout
                        navbar={Component.Navbar && <Component.Navbar />}
                        aside={Component.Aside && <Component.Aside />}
                      >
                        <AppAuthRedirect authRedirect={Component.authRedirect}>
                          <Component {...pageProps} />
                        </AppAuthRedirect>
                      </AppLayout>
                      <LegalNotification />
                    </MenuToggleProvider>
                  </MantineProvider>
                </ColorSchemeProvider>
              </QueryClientProvider>
            </LemmyClientContext.Provider>
          </LemmyAuthProvider>
        </NotificationsProvider>
      </I18nextProvider>
    </>
  );
}
