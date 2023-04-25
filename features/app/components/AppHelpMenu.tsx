import { Menu, ActionIcon } from "@mantine/core";
import {
  IconBrandTelegram,
  IconBrandGithub,
  IconHelp,
  IconGavel,
  IconHeartHandshake,
} from "@tabler/icons";
import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const AppHelpMenu: FC = () => {
  const { t } = useTranslation();

  return (
    <Menu position="bottom-start" transition="pop-top-right">
      <Menu.Target>
        <ActionIcon radius="xl" variant="subtle">
          <IconHelp stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="https://patreon.com/ujournal" passHref rel="noreferrer">
          <Menu.Item
            component="a"
            target="_blank"
            icon={<IconHeartHandshake size={24} stroke={1.5} />}
          >
            {t("support_lemmy")}
          </Menu.Item>
        </Link>
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
        <Link href="/legal" passHref rel="noreferrer">
          <Menu.Item icon={<IconGavel size={24} stroke={1.5} />} component="a">
            {t("legal_information")}
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
};
