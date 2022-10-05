import { Box, Burger, Button, Group, Header, MediaQuery } from "@mantine/core";
import { IconLogin, IconPencil } from "@tabler/icons";
import { AppBrand } from "features/app/components/AppBrand";
import { UserMenu } from "features/user/components/UserMenu";
import { useAuth } from "features/app/hooks/useAuth";
import Link from "next/link";
import { FC, useCallback, useMemo } from "react";
import { UserLoader } from "features/user/components/UserLoader";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useSiteUser } from "features/app/hooks/useSiteUser";
import { useMenuToggle } from "baza/hooks/useMenuToggle";
import { AppHelpMenu } from "./AppHelpMenu";
import { NotificationsMenu } from "features/notifications/components/NotificationsMenu";

export const AppHeader: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const { myUserInfo, isLoading: isUserInfoLoading } = useSiteUser();
  const { toggle: toggleMenu } = useMenuToggle();

  const handleToggleMenu = useCallback(() => {
    toggleMenu();
  }, [toggleMenu]);

  const user = useMemo(
    () =>
      myUserInfo?.match({
        some: (myUser) => ({
          name: myUser.local_user_view.person.display_name.unwrapOr(
            myUser.local_user_view.person.name
          ),
          image: myUser.local_user_view.person.avatar.unwrapOr(""),
        }),
        none: undefined,
      }),
    [myUserInfo]
  );

  const profileMenu = useMemo(
    () =>
      user ? (
        <UserMenu user={user} onLogOut={auth.logout} />
      ) : (
        <Link href={{ pathname: "/sign-in", query: {} }} passHref>
          <Button
            variant="subtle"
            component="a"
            leftIcon={<IconLogin stroke={1.5} />}
            color="dark"
            sx={{
              // color: "#000",
              "&:hover": { backgroundColor: "transparent" },
            }}
            styles={(theme) => ({
              root: {
                paddingRight: largerThanSm ? undefined : theme.spacing.sm,
              },
              leftIcon: {
                marginRight: largerThanSm ? undefined : 0,
              },
            })}
          >
            {largerThanSm ? t("login") : undefined}
          </Button>
        </Link>
      ),
    [auth.logout, largerThanSm, t, user]
  );

  return (
    <Header
      height={60}
      p="xs"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "light" ? theme.white : theme.colors.gray[9],
        borderWidth: 0,
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        zIndex: 200,
      })}
    >
      <Group position="apart" noWrap>
        <Group noWrap spacing="xs">
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={false} onClick={handleToggleMenu} size="sm" />
          </MediaQuery>

          <Link href={{ pathname: "/", query: {} }} passHref>
            <Box component="a" sx={{ display: "block", height: "40px" }}>
              <AppBrand />
            </Box>
          </Link>

          <AppHelpMenu />
        </Group>

        <Group spacing="xs" noWrap>
          <Link href="/create-post" passHref>
            <Button
              leftIcon={<IconPencil stroke={1.5} />}
              component="a"
              styles={{
                root: {
                  paddingRight: largerThanSm ? undefined : 12,
                },
                leftIcon: {
                  marginRight: largerThanSm ? undefined : 0,
                },
              }}
              radius="md"
            >
              {largerThanSm ? capitalize(t("create_post")) : undefined}
            </Button>
          </Link>

          <NotificationsMenu />

          {isUserInfoLoading ? (
            <UserLoader useRandomWidth={false} padding={0} opacity={0.75} />
          ) : (
            profileMenu
          )}
        </Group>
      </Group>
    </Header>
  );
};
