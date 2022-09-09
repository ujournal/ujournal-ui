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
    showPost?: boolean;
    decoration?: undefined | "middle" | "end";
  }
> = ({
  comment,
  creator,
  post,
  children = [],
  showPost = false,
  decoration,
}) => {
  return (
    <Stack
      spacing={0}
      sx={(theme) => ({
        position: "relative",
        marginLeft: decoration ? theme.spacing.md : undefined,
        "&:before": {
          position: "absolute",
          top: 0,
          left: -16,
          height: "100%",
          content: "''",
          borderLeft:
            decoration === "middle"
              ? `1px solid ${theme.colors.gray[4]}`
              : undefined,
        },
      })}
    >
      <Stack spacing={0}>
        <Group spacing={0}>
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
          <span>{decoration}</span>
        </Group>

        <Stack spacing={2}>
          <MarkdownText text={comment.content} withContentMargins={false} />

          {showPost && post && (
            <Tooltip
              label={post.name}
              sx={{ whiteSpace: "normal", maxWidth: 200 }}
            >
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
        </Stack>
      </Stack>

      {decoration && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 0,
            left: -16,
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

      {children.length > 0 && (
        <Stack spacing={0} data-hhh="1">
          <DataList
            data={children}
            itemComponent={Comment}
            itemProps={(_item, index) => ({
              asChild: true,
              decoration: children.length - 1 === index ? "end" : "middle",
            })}
          />
        </Stack>
      )}
    </Stack>
  );
};
