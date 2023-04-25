import { SitePage } from "types";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { usePersonDetails } from "features/user/hooks/usePersonDetails";
import { DateFormatted } from "baza/components/DeteFormatted";
import {
  Container,
  Card,
  Title,
  Stack,
  Text,
  Group,
  Avatar,
  Image,
} from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { MarkdownText } from "baza/components/MarkdownText";
import { IconUser } from "@tabler/icons";
import Head from "next/head";
import { useMemo } from "react";
import { AppNavbar } from "features/app/components/AppNavbar";

const UserPage: SitePage = () => {
  const { userId: _userId, username: _username } = useRouterQuery<{
    userId: number | undefined;
    username: string | undefined;
  }>({
    userId: undefined,
    username: undefined,
  });

  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const person = usePersonDetails({
    personId: _userId,
    username: _username,
  });

  const personView = useMemo(() => {
    if (!person.data) {
      return undefined;
    }

    return {
      person: person.data.person_view.person,
      commentCount: person.data.person_view.counts.comment_count,
      postCount: person.data.person_view.counts.post_count,
      commentScore: person.data.person_view.counts.comment_score,
      postScore: person.data.person_view.counts.post_score,
      totalScore:
        person.data.person_view.counts.comment_score +
        person.data.person_view.counts.post_score,
    };
  }, [person.data]);

  const userName = useMemo(
    () =>
      personView?.person.display_name.unwrapOr("") || personView?.person.name,
    [personView?.person.display_name, personView?.person.name]
  );

  return (
    <>
      <Head>{userName && <title>{userName} - UJournal</title>}</Head>

      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"} p="xl">
          {personView?.person.banner.unwrapOr("") && (
            <Card.Section mb="md">
              <Image
                src={personView?.person.banner.unwrapOr("")}
                height={160}
                alt={person.data?.person_view.person.name}
                sx={(theme) => ({ backgroundColor: theme.colors.gray[2] })}
              />
            </Card.Section>
          )}
          <Stack spacing="xl">
            <Group>
              <Avatar
                src={personView?.person.avatar?.match<string | undefined>({
                  some: (name) => name,
                  none: undefined,
                })}
                radius={500}
                size="xl"
              >
                <IconUser stroke={1.5} />
              </Avatar>
              <Stack spacing={2}>
                <Title>
                  {personView?.person.display_name.unwrapOr("") ||
                    personView?.person.name}
                </Title>
                {person.data && (
                  <Text sx={(theme) => ({ color: theme.colors.gray[6] })}>
                    @{personView?.person.name}
                  </Text>
                )}
              </Stack>
            </Group>
            <Stack spacing="xs">
              <Title size="h2">Цифри</Title>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Зареєстрований
                </Text>
                <DateFormatted
                  date={
                    new Date(personView?.person?.published ?? new Date() + "Z")
                  }
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                />
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Загальний рейтинг
                </Text>
                <Text
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                >
                  {personView?.totalScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Рейтинг постів
                </Text>
                <Text
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                >
                  {personView?.postScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Рейтинг коментарів
                </Text>
                <Text
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                >
                  {personView?.commentScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Кількість постів
                </Text>
                <Text
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                >
                  {personView?.postCount || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Кількість коментарів
                </Text>
                <Text
                  size="md"
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "light"
                        ? theme.black
                        : theme.colors.gray[3],
                  })}
                >
                  {personView?.commentCount || "н/д"}
                </Text>
              </Group>
            </Stack>
            {personView?.person.bio.unwrapOr("") && (
              <Stack spacing="xs">
                <Title size="h2">Інфо</Title>
                <MarkdownText
                  text={personView?.person.bio.unwrapOr("") || ""}
                />
              </Stack>
            )}
          </Stack>
        </Card>
      </Container>
    </>
  );
};

UserPage.Navbar = AppNavbar;

export default UserPage;
