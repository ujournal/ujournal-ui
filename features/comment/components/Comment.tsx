import { Box, Group, Stack } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { MarkdownText } from "baza/components/MarkdownText";
import { UserButton } from "features/user/components/UserButton";
import { FC } from "react";
import { CommentView } from "ujournal-lemmy-js-client";

export const Comment: FC<CommentView & { children: CommentView[] }> = ({
  comment,
  creator,
  children,
}) => {
  const hasChildren = children.length > 0;

  return (
    <Stack spacing={0}>
      <Group>
        <UserButton
          userId={creator.id}
          image={creator.avatar as unknown as string}
          label={
            (creator.display_name as unknown as string) ||
            (creator.name as unknown as string)
          }
          weight={600}
          ml="-sm"
        />
      </Group>
      <Stack spacing={0}>
        <MarkdownText text={comment.content} withContentMargins={false} />
        <Stack pl="md" spacing={0} sx={{ borderLeft: "1px solid grey" }}>
          <DataList data={children} itemComponent={Comment} />
        </Stack>
      </Stack>
    </Stack>
  );
};
