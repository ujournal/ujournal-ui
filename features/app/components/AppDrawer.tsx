import { Drawer, Tabs } from "@mantine/core";
import { IconLayoutSidebar, IconLayoutSidebarRight } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useMenuToggle } from "baza/hooks/useMenuToggle";
import { FC, ReactElement, useCallback, useState } from "react";

export const AppDrawer: FC<{
  navbar?: ReactElement;
  aside?: ReactElement;
}> = ({ navbar = null, aside = null }) => {
  const { opened: navbarOpened, toggle: toggleNavbar } = useMenuToggle();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const smallerThanMd = useBreakpoint({ smallerThan: "md" });

  const handleDrawerClose = useCallback(() => {
    toggleNavbar();
  }, [toggleNavbar]);

  return (
    <>
      {smallerThanMd && (
        <Drawer
          opened={navbarOpened}
          onClose={handleDrawerClose}
          padding="xl"
          size={smallerThanSm ? "85%" : 400}
          styles={{
            drawer: {
              backgroundColor: "#f2f2f2",
              overflow: "auto",
            },
          }}
        >
          <Tabs defaultValue="navbar" sx={{ marginTop: -44 }}>
            <Tabs.List>
              <Tabs.Tab
                value="navbar"
                icon={<IconLayoutSidebar stroke={1.5} />}
              />
              <Tabs.Tab
                value="aside"
                icon={<IconLayoutSidebarRight stroke={1.5} />}
              />
            </Tabs.List>

            <Tabs.Panel value="navbar" pt="xs">
              {navbar}
            </Tabs.Panel>

            <Tabs.Panel value="aside" pt="xs">
              {aside}
            </Tabs.Panel>
          </Tabs>
        </Drawer>
      )}
    </>
  );
};
