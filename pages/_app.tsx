import Head from "next/head";
import { I18nextProvider } from "react-i18next";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { LemmyClientContext, lemmyHttpClient } from "baza/hooks/useLemmyClient";
import { LemmyAuthProvider } from "features/app/hooks/useAuth";
import { markdown, MarkdownContext } from "baza/hooks/useMarkdown";
import { mantineTheme } from "baza/mantine/theme";
import { SiteAppProps } from "types";
import { NotificationsProvider } from "@mantine/notifications";
import { AppLayout } from "features/app/components/AppLayout";
import i18n from "baza/i18n";
import { queryClient } from "baza/reactQuery";
import { MenuToggleProvider } from "baza/hooks/useMenuToggle";
import "../styles/globals.css";
import { AppAuthRedirect } from "features/app/components/AppAuthRedirect";
import { LegalNotification } from "features/legal/components/LegalNotification";

export default function App(props: SiteAppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>UJournal</title>
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
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/site.webmanifest`}
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
          <MarkdownContext.Provider value={markdown}>
            <LemmyAuthProvider>
              <LemmyClientContext.Provider value={lemmyHttpClient}>
                <QueryClientProvider client={queryClient}>
                  <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={mantineTheme}
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
                </QueryClientProvider>
              </LemmyClientContext.Provider>
            </LemmyAuthProvider>
          </MarkdownContext.Provider>
        </NotificationsProvider>
      </I18nextProvider>
    </>
  );
}
