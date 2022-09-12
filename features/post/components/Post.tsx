import {
  Card,
  Group,
  Text,
  Box,
  Title,
  Container,
  MantineShadow,
} from "@mantine/core";
import { FC, MutableRefObject } from "react";
import { PostView } from "ujournal-lemmy-js-client";
import { Embed } from "features/embed/components/Embed";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import Link from "next/link";
import { MarkdownText } from "baza/components/MarkdownText";
import { BoxExpandable } from "baza/components/BoxExpandable";
import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";

export const Post: FC<
  PostView & {
    full?: boolean;
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
  full = false,
  commentsAsText = false,
  saved,
  shadow,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });

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
      <PostHeader
        community={community}
        creator={creator}
        post={post}
        saved={saved}
      />

      <Container size={650} p={0}>
        <Group position="apart" mt="xs" mb="md">
          {full ? (
            <Title size="h3" weight={600}>
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
            <BoxExpandable showBody={full}>
              <Text size="md" component="div">
                <MarkdownText text={body} />
              </Text>
            </BoxExpandable>
          ),
          none: undefined,
        })}
      </Container>

      <PostFooter
        post={post}
        myVote={myVote}
        counts={counts}
        commentsAsText={commentsAsText}
      />
    </Card>
  );
};
