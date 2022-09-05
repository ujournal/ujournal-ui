import Head from "next/head";
import { I18nextProvider } from "react-i18next";
import { MantineProvider, Navbar, ScrollArea } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LemmyClientContext, lemmyHttpClient } from "baza/hooks/useLemmyClient";
import { LemmyAuthProvider } from "features/auth/hooks/useAuth";
import { markdown, MarkdownContext } from "baza/hooks/useMarkdown";
import { mantineTheme } from "baza/mantine/theme";
import { SiteAppProps } from "types";
import { NotificationsProvider } from "@mantine/notifications";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { AppLayout } from "features/app/components/AppLayout";
import i18n from "baza/i18n";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function App(props: SiteAppProps) {
  const { Component, pageProps } = props;
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  const navbar =
    largerThanMd && Component.Navbar ? (
      <Navbar
        withBorder={false}
        width={{ base: 220 }}
        sx={{ backgroundColor: "transparent" }}
      >
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <Component.Navbar />
        </Navbar.Section>
      </Navbar>
    ) : undefined;

  return (
    <>
      <Head>
        <title>UJournal</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
                    <AppLayout navbar={navbar}>
                      <Component {...pageProps} />
                    </AppLayout>
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
