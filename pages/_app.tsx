import Head from "next/head";
import { AppShell, MantineProvider, Navbar, ScrollArea } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LemmyClientContext, lemmyHttpClient } from "hooks/useLemmyClient";
import { LemmyAuthProvider } from "hooks/useLemmyAuth";
import { markdown, MarkdownContext } from "hooks/useMarkdown";
import { mantineTheme } from "mantine/theme";
import { SiteAppProps } from "types";
import { NotificationsProvider } from "@mantine/notifications";
import { useBreakpoint } from "hooks/useBreakpoint";
import "../styles/globals.css";
import { AppHeader } from "features/app/components/AppHeader";
import { useSite } from "hooks/useSite";

const queryClient = new QueryClient();

export default function App(props: SiteAppProps) {
  const { Component, pageProps } = props;
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  return (
    <>
      <Head>
        <title>UJournal</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

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
                  <AppShell
                    padding="md"
                    navbar={
                      largerThanMd && Component.Navbar ? (
                        <Navbar
                          withBorder={false}
                          width={{ base: 220 }}
                          sx={{ backgroundColor: "transparent" }}
                        >
                          <Navbar.Section
                            grow
                            component={ScrollArea}
                            mx="-xs"
                            px="xs"
                          >
                            <Component.Navbar />
                          </Navbar.Section>
                        </Navbar>
                      ) : undefined
                    }
                    header={<AppHeader />}
                    styles={(theme) => ({
                      main: {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                      },
                    })}
                  >
                    <Component {...pageProps} />
                  </AppShell>
                </MantineProvider>
              </QueryClientProvider>
            </LemmyClientContext.Provider>
          </LemmyAuthProvider>
        </MarkdownContext.Provider>
      </NotificationsProvider>
    </>
  );
}
