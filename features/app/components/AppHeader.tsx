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
import { Brand } from "components/Brand";
import { UserMenu } from "features/user/components/UserMenu";
import { useLemmyAuth } from "hooks/useLemmyAuth";
import { useSite } from "hooks/useSite";
import Link from "next/link";
import { FC, useMemo } from "react";

export const AppHeader: FC = () => {
  const site = useSite();
  const auth = useLemmyAuth();

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
        backgroundColor: "#FFF",
        borderColor: "#F3F2F2",
      }}
    >
      <Group position="apart">
        <Group>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger opened={false} onClick={() => {}} size="sm" />
          </MediaQuery>

          <Link href="/" passHref>
            <Box component="a" sx={{ display: "block", height: "40px" }}>
              <Brand />
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
            >
              Увійти
            </Button>
          </Link>
        )}
      </Group>
    </Header>
  );
};
