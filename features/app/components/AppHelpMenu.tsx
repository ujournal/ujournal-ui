import { Menu, ActionIcon } from "@mantine/core";
import { IconBrandTelegram, IconBrandGithub, IconHelp } from "@tabler/icons";
import Link from "next/link";
import { FC } from "react";

export const AppHelpMenu: FC = () => {
  return (
    <Menu position="bottom-start" transition="pop-top-right">
      <Menu.Target>
        <ActionIcon radius="xl" variant="subtle">
          <IconHelp stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Link
          href="https://github.com/uJournal/ujournal-ui"
          passHref
          rel="noreferrer"
        >
          <Menu.Item
            component="a"
            target="_blank"
            icon={<IconBrandGithub size={24} stroke={1.5} />}
          >
            GitHub
          </Menu.Item>
        </Link>
        <Link href="https://t.me/tjournalcomua" passHref rel="noreferrer">
          <Menu.Item
            icon={<IconBrandTelegram size={24} stroke={1.5} />}
            component="a"
            target="_blank"
          >
            Telegram
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
};
