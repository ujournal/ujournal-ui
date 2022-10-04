import {
  Avatar,
  Box,
  Container,
  Group,
  Stack,
  Tooltip,
  Text,
} from "@mantine/core";
import { FC, useMemo } from "react";
import { PersonSafe, Post } from "ujournal-lemmy-js-client";
import { usePersonDetails } from "../../user/hooks/usePersonDetails";
import { IconUser } from "@tabler/icons";
import { MarkdownText } from "baza/components/MarkdownText";
import Link from "next/link";
import { Score } from "baza/components/Score";

export const PostCreator: FC<{
  post: Post;
}> = ({ post }) => {
  const person = usePersonDetails({
    personId: post.creator_id,
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

  const creator = personView?.person ?? new PersonSafe();

  return (
    <Container size={650} p={0} sx={{ width: "100%" }}>
      <Group noWrap>
        <Avatar
          src={creator.avatar?.match<string | undefined>({
            some: (name) => name,
            none: undefined,
          })}
          radius="xl"
          size="lg"
        >
          <IconUser stroke={1.5} />
        </Avatar>
        <Stack spacing={2}>
          <Group spacing="sm">
            <Group noWrap>
              <Box sx={{ fontWeight: 600 }}>
                <Link
                  href={{
                    pathname: "/user",
                    query: { userId: creator.id },
                  }}
                  passHref
                >
                  <Box component="a">
                    {creator.display_name?.match<string>({
                      some: (name) => name,
                      none: () => creator.name,
                    })}
                  </Box>
                </Link>
              </Box>
              <Text color="gray">@{creator.name}</Text>
            </Group>
            <Score
              score={personView?.totalScore || 0}
              sx={{ fontWeight: 600, display: "none" }}
            />
          </Group>
          <Tooltip
            label={
              <MarkdownText text={personView?.person.bio.unwrapOr("") || ""} />
            }
            multiline
            sx={{
              whiteSpace: "normal",
              maxWidth: 300,
              overflowWrap: "break-word",
              "& a": {
                textDecoration: "none",
                color: "white",
              },
            }}
          >
            <Box>
              <MarkdownText
                text={personView?.person.bio.unwrapOr("") || ""}
                truncateLength={50}
              />
            </Box>
          </Tooltip>
        </Stack>
      </Group>
    </Container>
  );
};
