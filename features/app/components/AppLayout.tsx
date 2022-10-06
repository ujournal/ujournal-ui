import {
  AppShell,
  Aside,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, ReactElement, useEffect } from "react";
import { AppDrawer } from "./AppDrawer";
import { AppHeader } from "./AppHeader";
import { AppViewer } from "./AppViewer";

export const AppLayout: FC<{
  navbar?: ReactElement;
  aside?: ReactElement;
  children: ReactElement;
}> = ({ navbar, aside, children }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const theme = useMantineTheme();

  useEffect(() => {
    const themeColor = window.document.querySelector(
      'meta[name="theme-color"]'
    );
    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme.colorScheme === "light" ? "#fff" : "#000"
      );
    }
  }, [theme.colorScheme]);

  return (
    <>
      <AppShell
        padding="md"
        navbar={
          largerThanMd && navbar ? (
            <Navbar
              withBorder={false}
              width={{ base: 220 }}
              sx={{ backgroundColor: "transparent" }}
              hiddenBreakpoint="md"
            >
              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                {navbar}
              </Navbar.Section>
            </Navbar>
          ) : undefined
        }
        aside={
          largerThanMd && aside ? (
            <Aside
              withBorder={false}
              width={{ base: 220 }}
              fixed={false}
              sx={{ backgroundColor: "transparent" }}
            >
              <Aside.Section
                grow
                component={ScrollArea}
                styles={{
                  viewport: {
                    overflowWrap: "anywhere",
                  },
                }}
              >
                {aside}
              </Aside.Section>
            </Aside>
          ) : undefined
        }
        header={<AppHeader />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "light"
                ? theme.colors.gray[1]
                : theme.colors.black,
          },
        })}
      >
        {children}
      </AppShell>

      <AppDrawer navbar={navbar} aside={aside} />
      <AppViewer />
    </>
  );
};
