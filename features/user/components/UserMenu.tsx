import { Menu, UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconUser,
} from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

import Link from "next/link";
import { useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const UserMenu: FC<{
  user: { name: string; image: string };
  onLogOut: () => void;
}> = ({ user, onLogOut }) => {
  const { t } = useTranslation();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const largerThanSm = useBreakpoint({ largerThan: "sm" });

  return (
    <Menu
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      opened={userMenuOpened}
    >
      <Menu.Target>
        <UnstyledButton>
          <Group spacing={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size="sm" />
            {largerThanSm && (
              <Text weight={600} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user.name}
              </Text>
            )}
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="/profile" passHref>
          <Menu.Item
            component="a"
            icon={<IconUser size={24} stroke={1.5} />}
            sx={{ display: "none" }}
          >
            {t("profile")}
          </Menu.Item>
        </Link>
        <Link href="/settings" passHref>
          <Menu.Item
            icon={<IconSettings size={24} stroke={1.5} />}
            component="a"
            sx={{ display: "none" }}
          >
            {t("settings")}
          </Menu.Item>
        </Link>
        <Menu.Item
          icon={<IconLogout size={24} stroke={1.5} />}
          onClick={onLogOut}
        >
          {t("logout")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
