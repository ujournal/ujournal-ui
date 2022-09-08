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
        />
      </Group>
      <Stack spacing={0}>
        <Group sx={{ alignItems: "stretch" }} noWrap spacing={0}>
          <Box
            sx={(theme) => ({
              borderLeft: "1px solid",
              borderBottom: "1px solid",
              borderColor: hasChildren ? theme.colors.gray[4] : "transparent",
              minWidth: 24,
              marginBottom: -24,
              marginLeft: 24,
              borderBottomLeftRadius: 24,
            })}
          />
          <Box sx={{ flex: "1 1 0" }}>
            <MarkdownText text={comment.content} withContentMargins={false} />
          </Box>
        </Group>
        <Stack sx={{ marginLeft: 42 }} spacing={0}>
          <DataList data={children} itemComponent={Comment} />
        </Stack>
      </Stack>
    </Stack>
  );
};
