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
import { AppMeta } from "features/app/components/AppMeta";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useColorSchemeLocalStorage } from "baza/hooks/useColorSchemeLocalStorage";
import { useEffect, useMemo } from "react";
import Script from "next/script";

export default function App(props: SiteAppProps) {
  const { Component, pageProps } = props;
  const { colorScheme, toggleColorScheme } = useColorSchemeLocalStorage();

  const theme = useMemo(
    () => ({ ...mantineTheme, colorScheme }),
    [colorScheme]
  );

  useEffect(() => {
    window.__translateInit = () => {
      try {
        const _google: any = window.google;
        new _google.translate.TranslateElement(
          {
            pageLanguage: "uk",
          },
          "google_translate_element"
        );
      } catch {}
    };
  }, []);

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

      <Script
        src="//translate.google.com/translate_a/element.js?cb=__translateInit"
        strategy="afterInteractive"
      />

      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>

        <AppMeta />
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
