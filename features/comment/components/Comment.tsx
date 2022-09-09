import { Box, Group, Stack, Tooltip } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { MarkdownText } from "baza/components/MarkdownText";
import { UserButton } from "features/user/components/UserButton";
import Link from "next/link";
import { FC } from "react";
import { CommentView } from "ujournal-lemmy-js-client";

export const Comment: FC<
  CommentView & {
    children: CommentView[];
    asChild?: boolean;
    asSmall?: boolean;
    showPost?: boolean;
  }
> = ({
  comment,
  creator,
  post,
  children = [],
  asChild = false,
  asSmall = false,
  showPost = false,
}) => {
  return (
    <Stack spacing={0} sx={{ position: "relative" }}>
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
          py={0}
        />
      </Group>
      <Stack spacing={2}>
        <MarkdownText text={comment.content} withContentMargins={false} />
        {showPost && post && (
          <Tooltip label={post.name} width={200} sx={{ whiteSpace: "normal" }}>
            <Box>
              <Link
                href={{ pathname: "/post", query: { postId: post.id } }}
                passHref
              >
                <Box
                  component="a"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 14,
                    maxWidth: 200,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.name}
                </Box>
              </Link>
            </Box>
          </Tooltip>
        )}
        {children.length > 0 && (
          <Stack
            pl="md"
            spacing={0}
            sx={(theme) => ({
              borderLeft: "1px solid",
              borderColor: theme.colors.gray[3],
            })}
          >
            <DataList
              data={children}
              itemComponent={Comment}
              itemProps={{ asChild: true }}
            />
          </Stack>
        )}
      </Stack>
      {asChild && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 0,
            left: -17,
            width: 14,
            height: 24,
            borderStyle: "solid",
            borderColor: theme.colors.gray[4],
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomLeftRadius: theme.radius.md,
          })}
        />
      )}
    </Stack>
  );
};
