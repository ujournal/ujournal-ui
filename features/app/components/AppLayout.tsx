import { AppShell, Aside, Navbar, ScrollArea } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, ReactElement } from "react";
import { AppDrawer } from "./AppDrawer";
import { AppHeader } from "./AppHeader";
import { AppViewer } from "./AppViewer";

export const AppLayout: FC<{
  navbar?: ReactElement;
  aside?: ReactElement;
  children: ReactElement;
}> = ({ navbar, aside, children }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });

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
        styles={{
          main: {
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        {children}
      </AppShell>

      <AppDrawer navbar={navbar} aside={aside} />
      <AppViewer />
    </>
  );
};
