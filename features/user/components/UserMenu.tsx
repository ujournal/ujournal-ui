import {
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconUser,
  IconBookmark,
  IconSun,
  IconMoon,
} from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { capitalize } from "baza/utils/string";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const UserMenu: FC<{
  user: { username: string; name: string; image: string };
  onLogOut: () => void;
}> = ({ user, onLogOut }) => {
  const { t } = useTranslation();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const handleColorSchemeToggle = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

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
        <Link
          href={{ pathname: "/user", query: { username: user.username } }}
          passHref
        >
          <Menu.Item component="a" icon={<IconUser size={24} stroke={1.5} />}>
            {t("profile")}
          </Menu.Item>
        </Link>
        <Link href="/settings" passHref>
          <Menu.Item
            component="a"
            icon={<IconSettings size={24} stroke={1.5} />}
          >
            {t("settings")}
          </Menu.Item>
        </Link>
        <Link href="/saved" passHref>
          <Menu.Item
            icon={<IconBookmark size={24} stroke={1.5} />}
            component="a"
          >
            {t("saved")}
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
          icon={
            colorScheme === "light" ? (
              <IconMoon size={24} stroke={1.5} />
            ) : (
              <IconSun size={24} stroke={1.5} />
            )
          }
          onClick={handleColorSchemeToggle}
        >
          {capitalize(
            colorScheme === "light" ? t("dark_theme") : t("light_theme")
          )}
        </Menu.Item>
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
