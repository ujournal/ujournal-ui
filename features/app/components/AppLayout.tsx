import { AppShell, Aside, Drawer, Navbar, ScrollArea } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, ReactElement, useCallback, useState } from "react";
import { AppHeader } from "./AppHeader";

export const AppLayout: FC<{
  navbar?: ReactElement;
  aside?: ReactElement;
  children: ReactElement;
}> = ({ navbar, aside, children }) => {
  const [navbarOpened, setNavbarOpened] = useState<boolean>(false);
  const smallerThanMd = useBreakpoint({ smallerThan: "md" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  const toggleNavbar = useCallback(() => {
    setNavbarOpened((opened) => !opened);
  }, []);

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
                mx="-xs"
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
        header={<AppHeader onMenu={toggleNavbar} />}
        styles={(theme) => ({
          main: {
            backgroundColor: "#f2f2f2",
          },
        })}
      >
        {children}
      </AppShell>

      {smallerThanMd && (
        <Drawer
          opened={navbarOpened}
          onClose={toggleNavbar}
          padding="xl"
          size="75%"
          styles={{
            drawer: {
              backgroundColor: "#f2f2f2",
              overflow: "auto",
            },
          }}
        >
          {navbar}
        </Drawer>
      )}
    </>
  );
};
