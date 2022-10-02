import { Avatar, Box, Card, Group, Stack, Text } from "@mantine/core";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { CommunityItem } from "features/community/components/CommunityItem";
import { useCommunity } from "features/community/hooks/useCommunity";
import { usePost } from "features/post/hooks/usePost";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CommunityView } from "ujournal-lemmy-js-client";

const sponsors: {
  communityName: string;
  imageUrl: string;
  name: string;
  description: string;
  externalUrl: string;
}[] = [
  {
    communityName: "movies_and_series",
    imageUrl: "https://i.postimg.cc/65V3XRt7/2022-09-29-14-47-2-1.png",
    name: "КіноАрт",
    description: "Телеграм-канал про кіно українською",
    externalUrl: "https://t.me/kinoIart",
  },
];

export const Sponsor: FC<{ communityName: string }> = ({ communityName }) => {
  const sponsorLink = (
    <Stack spacing={4} align="center">
      <Text
        color="gray"
        size="sm"
        sx={{ textAlign: "center", lineHeight: 1.2 }}
      >
        Ви можете стати спонсором цієї спільноти
      </Text>
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSd7Pv2Ez111z7SNgFmieAaEsrCIgxuXYVV_fw4e76aZwb_nYQ/viewform?usp=sf_link"
        passHref
      >
        <Box component="a" target="_blank" rel="noreferrer">
          <Text size="sm" color="blue">
            Стати спонсором
          </Text>
        </Box>
      </Link>
    </Stack>
  );

  if (communityName === "movies_and_series") {
    return (
      <Card radius="md">
        <Stack spacing="sm">
          {sponsors
            .filter(
              ({ communityName: _communityName }) =>
                _communityName === communityName
            )
            .map(({ name, imageUrl, description, externalUrl }) => (
              <Link href={externalUrl} passHref key={name}>
                <Box
                  component="a"
                  sx={(theme) => ({
                    backgroundColor: theme.colors.gray[1],
                    borderRadius: theme.radius.md,
                  })}
                  p={4}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Group noWrap spacing={4}>
                    <Avatar src={imageUrl} size={40} />
                    <Stack spacing={2}>
                      <Text size={12} weight={600}>
                        {name}
                      </Text>
                      <Text size={12}>{description}</Text>
                    </Stack>
                  </Group>
                </Box>
              </Link>
            ))}
          {sponsorLink}
        </Stack>
      </Card>
    );
  }

  return (
    <Card radius="md">
      <Stack spacing="xs">
        <Box
          sx={(theme) => ({
            border: `2px dotted ${theme.colors.blue[3]}`,
            backgroundColor: theme.colors.blue[0],
            color: theme.colors.gray[6],
            borderRadius: theme.radius.md,
            textAlign: "center",
            padding: theme.spacing.md,
            lineHeight: 1.2,
          })}
        >
          Тут може бути ваше лого
        </Box>
        {sponsorLink}
      </Stack>
    </Card>
  );
};

export const AppCommunityAside: FC = () => {
  const router = useRouter();
  const { postId: _postId, communityName } = useRouterQuery<{
    postId: number;
    communityName: string | undefined;
  }>({
    postId: -1,
    communityName: undefined,
  });
  const postId = Number(_postId);
  const post = usePost({ postId });
  const community = useCommunity({ communityName });

  const communityView = useMemo(() => {
    if (post.data) {
      return post.data?.community_view as Omit<CommunityView, "subscribed">;
    }

    if (community.data) {
      return community.data?.community_view as Omit<
        CommunityView,
        "subscribed"
      >;
    }

    return undefined;
  }, [community.data, post.data]);

  if (!communityView) {
    return null;
  }

  return (
    <Box p={4}>
      <Stack spacing="md">
        {!router.pathname.startsWith("/community") && (
          <CommunityItem {...communityView} compact />
        )}
        {communityView && (
          <Sponsor communityName={communityView.community.name} />
        )}
      </Stack>
    </Box>
  );
};
