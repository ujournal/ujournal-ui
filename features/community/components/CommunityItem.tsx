import {
  Avatar,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Title,
  Text,
  Button,
  Box,
} from "@mantine/core";
import { Some } from "@sniptt/monads";
import {
  IconCircleCheck,
  IconCircleMinus,
  IconPencil,
  IconSpeakerphone,
} from "@tabler/icons";
import { MarkdownText } from "baza/components/MarkdownText";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { capitalize } from "baza/utils/string";
import { useSiteUser } from "features/app/hooks/useSiteUser";
import Link from "next/link";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  CommunityModeratorView,
  CommunityView,
} from "ujournal-lemmy-js-client";
import { useCommunitySubscription } from "../hooks/useCommunitySubscription";

type CommunityItemProps = Omit<CommunityView, "subscribed"> & {
  subscribed?: boolean;
  compact?: boolean;
  moderators?: CommunityModeratorView[];
};

export const CommunityItem: FC<CommunityItemProps> = ({
  community,
  counts,
  subscribed = false,
  compact = false,
  moderators,
}) => {
  const { t } = useTranslation();
  const subscription = useCommunitySubscription();
  const user = useSiteUser();

  const handleSubscriptionToggle = useCallback(async () => {
    await subscription.mutateAsync({
      communityId: community.id,
      follow: !subscribed,
    });
  }, [community.id, subscribed, subscription]);

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }} radius="md">
      {community.banner.unwrapOr("") && (
        <Card.Section mb="md">
          <Image
            src={community.banner.unwrapOr("")}
            height={160}
            alt={community.name}
            sx={(theme) => ({ backgroundColor: theme.colors.gray[2] })}
          />
        </Card.Section>
      )}
      <Stack sx={{ flex: "1 1 0" }}>
        <Group noWrap={!compact}>
          <Link
            href={{
              pathname: "/community",
              query: { communityName: community.name },
            }}
            passHref
          >
            <Avatar
              component="a"
              src={community.icon.unwrapOr("")}
              size={60}
              radius="md"
            >
              <IconSpeakerphone stroke={1.5} />
            </Avatar>
          </Link>
          <Stack spacing={4}>
            <Title size={18}>
              <Link
                href={{
                  pathname: "/community",
                  query: { communityName: community.name },
                }}
                passHref
              >
                <Box component="a">{community.title || community.name}</Box>
              </Link>
            </Title>
            <MarkdownText text={community.description.unwrapOr("")} />
          </Stack>
        </Group>
        <Grid
          align="stretch"
          sx={{
            gap: 0,
          }}
          gutter="sm"
        >
          <Grid.Col span={compact ? 12 : 6}>
            <Group noWrap position="apart" align="flex-start">
              <Text color="gray.5">{t("subscribers")}</Text>
              <Text sx={{ whiteSpace: "nowrap" }}>{counts.subscribers}</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={compact ? 12 : 6}>
            <Group noWrap position="apart" align="flex-start">
              <Text color="gray.5">{t("posts")}</Text>
              <Text sx={{ whiteSpace: "nowrap" }}>{counts.posts}</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={compact ? 12 : 6}>
            <Group noWrap position="apart" align="flex-start">
              <Text color="gray.5">
                {t("users")} / {t("month")}
              </Text>
              <Text sx={{ whiteSpace: "nowrap" }}>
                {counts.users_active_month}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={compact ? 12 : 6}>
            <Group noWrap position="apart" align="flex-start">
              <Text color="gray.5">{t("comments")}</Text>
              <Text sx={{ whiteSpace: "nowrap" }}>{counts.comments}</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Stack>
      <Stack spacing={2} mt="md">
        <Link
          href={{
            pathname: "/create-post",
            query: { communityId: community.id },
          }}
        >
          <Button
            component="a"
            variant="outline"
            leftIcon={<IconPencil stroke={1.5} />}
            radius="md"
            sx={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            {capitalize(t("create_post"))}
          </Button>
        </Link>
        {user.amMod(Some(moderators)) && (
          <Link
            href={{
              pathname: "/edit-community",
              query: { communityName: community.name },
            }}
          >
            <Button
              component="a"
              variant="outline"
              leftIcon={<IconPencil stroke={1.5} />}
              radius="md"
              sx={{
                borderRadius: 4,
              }}
            >
              {capitalize(t("edit"))}
            </Button>
          </Link>
        )}
        <Button
          variant={subscribed ? "outline" : "light"}
          leftIcon={
            subscribed ? (
              <IconCircleMinus stroke={1.5} />
            ) : (
              <IconCircleCheck stroke={1.5} />
            )
          }
          onClick={handleSubscriptionToggle}
          loading={subscription.isLoading}
          disabled={subscription.isLoading}
          radius="md"
          sx={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        >
          {capitalize(subscribed ? t("unsubscribe") : t("subscribe"))}
        </Button>
      </Stack>
    </Card>
  );
};

export const CommunityItemWithCol: FC<CommunityItemProps> = (props) => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  return (
    <Grid.Col
      span={largerThanSm ? (largerThanMd ? 4 : 6) : 12}
      sx={{ display: "flex", justifyItems: "stretch" }}
    >
      <CommunityItem {...props} />
    </Grid.Col>
  );
};
