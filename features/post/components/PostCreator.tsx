import { Avatar, Box, Container, Group, Stack, Tooltip } from "@mantine/core";
import { FC } from "react";
import { PersonSafe, Post } from "ujournal-lemmy-js-client";
import { usePersonViewSafe } from "../../user/hooks/userPersonViewSafe";
import { IconUser } from "@tabler/icons";
import { MarkdownText } from "baza/components/MarkdownText";

export const PostCreator: FC<{
  post: Post;
}> = ({ post }) => {
  let personViewSafe = usePersonViewSafe({
    creatorId: post.creator_id,
  });
  let creator = personViewSafe.data?.person ?? new PersonSafe();

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
        <Stack spacing={4}>
          <Group spacing="sm">
            <Box sx={{ fontWeight: 600 }}>
              {creator.display_name?.match<string>({
                some: (name) => name,
                none: () => creator.name,
              })}
            </Box>
            {/* <Score
              score={personViewSafe?.data?.totalScore || 0}
              sx={{ fontWeight: 600 }}
            /> */}
          </Group>
          <Tooltip
            label={
              <MarkdownText
                text={personViewSafe?.data?.person.bio.unwrapOr("") || ""}
              />
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
                text={personViewSafe?.data?.person.bio.unwrapOr("") || ""}
                truncateLength={50}
              />
            </Box>
          </Tooltip>
        </Stack>
      </Group>
    </Container>
  );
};
