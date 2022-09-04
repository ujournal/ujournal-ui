import {
  Box,
  Burger,
  Button,
  Group,
  Header,
  MediaQuery,
  UnstyledButton,
} from "@mantine/core";
import { IconLogin } from "@tabler/icons";
import { AppBrand } from "features/app/components/AppBrand";
import { UserMenu } from "features/user/components/UserMenu";
import { useAuth } from "features/auth/hooks/useAuth";
import { useSite } from "baza/hooks/useSite";
import Link from "next/link";
import { FC, useMemo } from "react";

export const AppHeader: FC = () => {
  const site = useSite();
  const auth = useAuth();

  const user = useMemo(
    () =>
      site.data?.my_user.match({
        some: (myUser) => ({
          name: myUser.local_user_view.person.display_name.unwrapOr(
            myUser.local_user_view.person.name
          ),
          image: myUser.local_user_view.person.avatar.unwrapOr(""),
        }),
        none: undefined,
      }),
    [site.data?.my_user]
  );

  return (
    <Header
      height={60}
      p="xs"
      sx={{
        background: "linear-gradient(135deg, #7EC0FC 0%, #D9F6A4 100%)",
        borderWidth: 0,
        boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Group position="apart">
        <Group>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={false} onClick={() => {}} size="sm" />
          </MediaQuery>

          <Link href="/" passHref>
            <Box component="a" sx={{ display: "block", height: "40px" }}>
              <AppBrand />
            </Box>
          </Link>
        </Group>

        {user ? (
          <UserMenu user={user} onLogOut={auth.logout} />
        ) : (
          <Link href="/login" passHref>
            <Button
              variant="subtle"
              component="a"
              leftIcon={<IconLogin stroke={1.5} />}
              color="transparent"
              sx={{
                color: "#000",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              Увійти
            </Button>
          </Link>
        )}
      </Group>
    </Header>
  );
};
