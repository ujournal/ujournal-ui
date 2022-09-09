import {
  Card,
  Group,
  Text,
  Box,
  Title,
  ActionIcon,
  Menu,
  Button,
  Tooltip,
  ScrollArea,
  Container,
  MantineShadow,
} from "@mantine/core";
import { FC, MutableRefObject, useEffect } from "react";
import { PostView } from "ujournal-lemmy-js-client";
import {
  IconDots,
  IconTrash,
  IconCaretDown,
  IconCaretUp,
  IconMessageCircle2,
  IconStar,
  IconStarOff,
  IconCopy,
  IconPencil,
  IconLock,
  IconPin,
} from "@tabler/icons";
import { UserButton } from "features/user/components/UserButton";
import { CommunityButton } from "features/community/components/CommunityButton";
import { Some } from "@sniptt/monads";
import { Embed } from "features/embed/components/Embed";
import { useState } from "react";
import { useCallback } from "react";
import { VoteButtons } from "baza/components/VoteButtons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { formatShortNum } from "baza/utils/number";
import { DateFormatted } from "baza/components/DeteFormatted";
import Link from "next/link";
import { capitalize } from "baza/utils/string";
import { MarkdownText } from "baza/components/MarkdownText";
import { usePostVote } from "../hooks/usePostVote";

export const Post: FC<
  PostView & {
    showBody?: boolean;
    showToogleBodyButton?: boolean;
    commentsAsText?: boolean;
    containerRef?: MutableRefObject<HTMLDivElement>;
    shadow?: MantineShadow;
  }
> = ({
  creator,
  community,
  post,
  counts,
  my_vote: myVote,
  showBody = false,
  commentsAsText = false,
  saved,
  shadow,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });

  const [_showBody, setShowBody] = useState<boolean>(showBody);

  const { t } = useTranslation();

  const [countsAndMyVote, setCountsAndMyVote] = useState({
    counts,
    myVote: myVote.unwrapOr(0),
  });

  const vote = usePostVote({
    postId: post.id,
    onSuccess: setCountsAndMyVote,
  });

  const handleToggleShowBody = useCallback(() => {
    setShowBody(!_showBody);
  }, [_showBody]);

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote: myVote.unwrapOr(0),
    });
  }, [counts, myVote]);

  return (
    <Card
      p={largerThanMd ? "lg" : "sm"}
      radius={smallerThanSm ? 0 : "md"}
      withBorder={false}
      style={{
        position: "relative",
        borderColor: "rgba(0, 0, 0, 0.07)",
        borderLeftWidth: smallerThanSm ? 0 : undefined,
        borderRightWidth: smallerThanSm ? 0 : undefined,
      }}
      shadow={shadow}
    >
      <ScrollArea sx={{ overflow: "visible !important" }}>
        <Container size={650} p={0}>
          <Group position="apart" mt="-xs" noWrap>
            <Group
              noWrap
              sx={{ flex: "1 1 0", flexGrow: "unset" }}
              spacing="xs"
              mx="-xs"
            >
              <CommunityButton
                communityName={community.name}
                image={community.icon.match<string | undefined>({
                  some: (name) => name,
                  none: undefined,
                })}
                label={Some(community.title).match<string>({
                  some: (name) => name,
                  none: () => community.name,
                })}
                weight={600}
              />
              <UserButton
                userId={creator.id}
                image={creator.avatar.match<string | undefined>({
                  some: (name) => name,
                  none: undefined,
                })}
                label={creator.display_name.match<string>({
                  some: (name) => name,
                  none: () => creator.name,
                })}
              />
              <DateFormatted date={new Date(post.published)} />
            </Group>

            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={
                    saved ? <IconStarOff size={14} /> : <IconStar size={14} />
                  }
                  sx={{ display: "none" }}
                >
                  {saved ? capitalize(t("unsave")) : capitalize(t("save"))}
                </Menu.Item>
                <Menu.Item
                  icon={<IconCopy size={14} />}
                  sx={{ display: "none" }}
                >
                  {capitalize(t("cross_post"))}
                </Menu.Item>
                <Link href={`/edit-post?postId=${post.id}`}>
                  <Menu.Item icon={<IconPencil size={14} />} component="a">
                    {capitalize(t("edit"))}
                  </Menu.Item>
                </Link>
                <Menu.Item
                  icon={<IconLock size={14} />}
                  sx={{ display: "none" }}
                >
                  {post.locked
                    ? capitalize(t("unlock"))
                    : capitalize(t("lock"))}
                </Menu.Item>
                <Menu.Item
                  icon={<IconPin size={14} />}
                  sx={{ display: "none" }}
                >
                  {post.stickied
                    ? capitalize(t("unsticky"))
                    : capitalize(t("sticky"))}
                </Menu.Item>
                <Menu.Item icon={<IconTrash size={14} />} color="red">
                  {post.deleted
                    ? capitalize(t("restore"))
                    : capitalize(t("delete"))}
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={14} />}
                  color="red"
                  sx={{ display: "none" }}
                >
                  {post.removed
                    ? capitalize(t("restore"))
                    : capitalize(t("remove"))}{" "}
                  ({t("mod")})
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </ScrollArea>

      <Container size={650} p={0}>
        <Group position="apart" mt="xs" mb="md">
          <Link
            href={{ pathname: "/post", query: { postId: post.id } }}
            passHref
          >
            <Box component="a">
              <Title size="h3" weight={600}>
                {post.name}
              </Title>
            </Box>
          </Link>
        </Group>
      </Container>

      <Card.Section>
        {post.url.match({
          some: (url) => (
            <Embed
              src={url}
              title={post.embed_title.unwrapOr("")}
              description={post.embed_description.unwrapOr("")}
              thumbnail={post.thumbnail_url.unwrapOr("")}
            />
          ),
          none: undefined,
        })}
      </Card.Section>

      <Container size={650} p={0}>
        {post.body.match({
          some: (body) => (
            <>
              <Box
                mt={largerThanMd ? "lg" : "sm"}
                mx="-lg"
                px="lg"
                sx={{
                  position: "relative",
                  maxHeight: _showBody ? undefined : "100px",
                  overflow: _showBody ? undefined : "hidden",
                  "&:after": _showBody
                    ? undefined
                    : {
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        content: "''",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                        pointerEvents: "none",
                      },
                }}
              >
                <Text size="md" component="div">
                  <MarkdownText text={body} />
                </Text>
              </Box>
              {!showBody && (
                <Button
                  variant="light"
                  radius="md"
                  onClick={handleToggleShowBody}
                  fullWidth
                  mt="md"
                  size="xs"
                  sx={(theme) => ({
                    backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
                  })}
                >
                  {_showBody ? (
                    <IconCaretUp stroke={1.5} />
                  ) : (
                    <IconCaretDown stroke={1.5} />
                  )}
                </Button>
              )}
            </>
          ),
          none: undefined,
        })}
      </Container>

      <Container size={650} p={0}>
        <Group
          position="apart"
          mt="xs"
          ml="-xs"
          mb={largerThanMd ? "-xs" : undefined}
        >
          <Group noWrap sx={{ flex: "1 1 0", flexGrow: "unset" }} spacing="xs">
            {commentsAsText ? (
              <Box sx={{ whiteSpace: "nowrap", fontWeight: 600 }} p="sm">
                {t("number_of_comments", {
                  count: counts.comments,
                  formattedCount: formatShortNum(counts.comments),
                })}
              </Box>
            ) : (
              <Link href={`/post?postId=${post.id}#comments`} passHref>
                <Tooltip
                  label={t("number_of_comments", {
                    count: counts.comments,
                    formattedCount: counts.comments,
                  })}
                  openDelay={1000}
                >
                  <Button
                    component="a"
                    leftIcon={<IconMessageCircle2 stroke={1.5} />}
                    variant="subtle"
                  >
                    {t("number_of_comments", {
                      count: counts.comments,
                      formattedCount: formatShortNum(counts.comments),
                    })}
                  </Button>
                </Tooltip>
              </Link>
            )}
          </Group>
          <VoteButtons
            counts={countsAndMyVote.counts}
            myVote={countsAndMyVote.myVote}
            vote={vote}
          />
        </Group>
      </Container>
    </Card>
  );
};
