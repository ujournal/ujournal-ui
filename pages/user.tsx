import { SitePage } from "types";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { usePersonViewSafe } from "features/user/hooks/userPersonViewSafe";
import { DateFormatted } from "baza/components/DeteFormatted";
import {
  Container,
  Card,
  Title,
  Stack,
  Box,
  Text,
  Group,
  Avatar,
} from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { MarkdownText } from "baza/components/MarkdownText";
import { IconUser } from "@tabler/icons";
import Head from "next/head";
import { useMemo } from "react";

const UserPage: SitePage = () => {
  const { userId: _userId } = useRouterQuery<{ userId: number }>({
    userId: -1,
  });

  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

  const personViewSafe = usePersonViewSafe({
    creatorId: _userId,
  });

  const userName = useMemo(
    () =>
      personViewSafe.data?.person.display_name.unwrapOr("") ||
      personViewSafe.data?.person.name,
    [personViewSafe.data?.person.display_name, personViewSafe.data?.person.name]
  );

  return (
    <>
      <Head>{userName && <title>{userName} - UJournal</title>}</Head>

      <Container px={0} mx={largerThanSm ? undefined : "-md"}>
        <Card radius={smallerThanSm ? 0 : "md"} p="xl">
          <Stack spacing="xl">
            <Group>
              <Avatar
                src={personViewSafe.data?.person.avatar?.match<
                  string | undefined
                >({
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
                  {personViewSafe.data?.person.display_name.unwrapOr("") ||
                    personViewSafe.data?.person.name}
                </Title>
                <Text sx={(theme) => ({ color: theme.colors.gray[6] })}>
                  @{personViewSafe.data?.person.name}
                </Text>
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
                    new Date(
                      personViewSafe.data?.person?.published ?? new Date() + "Z"
                    )
                  }
                  size="md"
                  color="black"
                />
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Загальний рейтинг
                </Text>
                <Text size="md" color="black">
                  {personViewSafe.data?.totalScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Рейтинг постів
                </Text>
                <Text size="md" color="black">
                  {personViewSafe.data?.postScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Рейтинг коментарів
                </Text>
                <Text size="md" color="black">
                  {personViewSafe.data?.commentScore || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Кількість постів
                </Text>
                <Text size="md" color="black">
                  {personViewSafe.data?.postCount || "н/д"}
                </Text>
              </Group>
              <Group noWrap>
                <Text sx={{ minWidth: 170 }} color="gray">
                  Кількість коментарів
                </Text>
                <Text size="md" color="black">
                  {personViewSafe.data?.commentCount || "н/д"}
                </Text>
              </Group>
            </Stack>
            {personViewSafe.data?.person.bio.unwrapOr("") && (
              <Stack spacing="xs">
                <Title size="h2">Інфо</Title>
                <MarkdownText
                  text={personViewSafe.data?.person.bio.unwrapOr("") || ""}
                />
              </Stack>
            )}
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default UserPage;
