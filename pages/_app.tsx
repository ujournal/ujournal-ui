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
import { useMemo } from "react";

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
