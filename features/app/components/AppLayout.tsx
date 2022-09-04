import { AppShell } from "@mantine/core";
import { FC, ReactElement } from "react";
import { AppHeader } from "./AppHeader";

export const AppLayout: FC<{
  navbar?: ReactElement;
  children: ReactElement;
}> = ({ navbar, children }) => {
  return (
    <AppShell
      padding="md"
      navbar={navbar}
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
      {children}
    </AppShell>
  );
};
