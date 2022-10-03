import {
  Card,
  Group,
  Box,
  Title,
  Container,
  MantineShadow,
  Stack,
  Button,
} from "@mantine/core";
import { FC, MutableRefObject, useMemo } from "react";
import { PostView } from "ujournal-lemmy-js-client";
import { Embed } from "features/embed/components/Embed";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import Link from "next/link";
import { MarkdownText } from "baza/components/MarkdownText";
import { PostHeader } from "./PostHeader";
import { PostControls } from "./PostControls";
import { PostCreator } from "./PostCreator";
import { isPostUrlPlaceholder } from "../utils/postUrl";
import { IconCaretRight } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";
import { Nsfw } from "baza/components/Nsfw";

export const Post: FC<
  PostView & {
    full?: boolean;
    showToogleBodyButton?: boolean;
    commentsAsText?: boolean;
    showPostCreator?: boolean;
    containerRef?: MutableRefObject<HTMLDivElement>;
    shadow?: MantineShadow;
    truncateLength?: number;
  }
> = ({
  creator,
  community,
  post,
  counts,
  my_vote: myVote,
  full = false,
  commentsAsText = false,
  showPostCreator = false,
  truncateLength = 840,
  saved,
  shadow,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const { t } = useTranslation();

  const url = useMemo(
    () =>
      post.url.match({
        some: (url) => (
          <>
            {!isPostUrlPlaceholder(url) ? (
              <Embed
                src={url}
                title={post.embed_title.unwrapOr("")}
                description={post.embed_description.unwrapOr("")}
                thumbnail={post.thumbnail_url.unwrapOr("")}
              />
            ) : undefined}
          </>
        ),
        none: undefined,
      }),
    [post.embed_description, post.embed_title, post.thumbnail_url, post.url]
  );

  const body = useMemo(
    () =>
      post.body.match({
        some: (body) => (
          <>
            <MarkdownText
              text={body}
              truncateLength={!full ? truncateLength : undefined}
              pt={
                post.url.isSome() &&
                !isPostUrlPlaceholder(post.url.unwrapOr(""))
                  ? "md"
                  : undefined
              }
            />
            {!full && body.length > truncateLength ? (
              <Link
                href={{ pathname: "/post", query: { postId: post.id } }}
                passHref
              >
                <Button
                  variant="light"
                  radius="md"
                  fullWidth
                  mt="md"
                  size="xs"
                  sx={(theme) => ({
                    backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
                  })}
                  component="a"
                  rightIcon={<IconCaretRight stroke={1.5} />}
                >
                  {capitalize(t("more"))}
                </Button>
              </Link>
            ) : undefined}
          </>
        ),
        none: undefined,
      }),
    [full, post.body, post.id, post.url, t, truncateLength]
  );

  return (
    <Card
      p={largerThanMd ? "lg" : "sm"}
      radius={smallerThanSm ? 0 : "md"}
      withBorder={false}
      sx={{
        position: "relative",
        borderColor: "rgba(0, 0, 0, 0.07)",
        borderLeftWidth: smallerThanSm ? 0 : undefined,
        borderRightWidth: smallerThanSm ? 0 : undefined,
      }}
      shadow={shadow}
    >
      <PostHeader
        community={community}
        creator={creator}
        post={post}
        saved={saved}
      />

      {post.name !== "..." && (
        <Container size={650} p={0}>
          <Group position="apart" mt="xs" mb="md">
            {full ? (
              <Title size="h1" weight={600}>
                {post.name}
              </Title>
            ) : (
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
            )}
          </Group>
        </Container>
      )}

      <Nsfw enabled={post.nsfw || community.nsfw}>
        <>
          <Card.Section>{url}</Card.Section>

          <Container size={650} p={0}>
            {body}
          </Container>
        </>
      </Nsfw>

      <Stack spacing="md">
        <PostControls
          post={post}
          myVote={myVote}
          counts={counts}
          commentButtonDisabled={commentsAsText}
        />

        {showPostCreator && <PostCreator post={post} />}
      </Stack>
    </Card>
  );
};
