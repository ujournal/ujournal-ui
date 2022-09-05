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
          backgroundColor: "#f2f2f2",
        },
      })}
    >
      {children}
    </AppShell>
  );
};
