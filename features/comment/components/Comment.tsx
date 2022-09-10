import { Box, Button, Group, Stack, Tooltip } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { MarkdownText } from "baza/components/MarkdownText";
import { capitalize } from "baza/utils/string";
import { UserButton } from "features/user/components/UserButton";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CommentView } from "ujournal-lemmy-js-client";
import { DateFormatted } from "../../../baza/components/DeteFormatted";
import { VoteButtons } from "../../../baza/components/VoteButtons";
import { useCommentVote } from "../hooks/useCommentVote";

export const Comment: FC<
  CommentView & {
    children: CommentView[];
    compact?: boolean;
    decoration?: undefined | "middle" | "end";
  }
> = ({
  comment,
  creator,
  post,
  children = [],
  compact = false,
  decoration,
  counts,
  my_vote: myVote,
}) => {
  const { t } = useTranslation();

  const [countsAndMyVote, setCountsAndMyVote] = useState({
    counts,
    myVote: myVote.unwrapOr(0),
  });

  const vote = useCommentVote({
    commentId: comment.id,
    onSuccess: setCountsAndMyVote,
  });

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote: myVote.unwrapOr(0),
    });
  }, [counts, myVote]);

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
              ? `1px solid ${theme.colors.gray[3]}`
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
        </Group>

        <Group>
          {comment?.published != null ? (
            <DateFormatted date={new Date(comment.published + "Z")} />
          ) : null}
        </Group>

        <Stack spacing={2}>
          <MarkdownText text={comment.content} withContentMargins={false} />

          {!compact && (
            <Box>
              <Group position="apart">
                <Button
                  color="gray"
                  p={0}
                  variant="subtle"
                  sx={{
                    height: "auto",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {capitalize(t("reply"))}
                </Button>
                <VoteButtons
                  counts={countsAndMyVote.counts}
                  myVote={countsAndMyVote.myVote}
                  vote={vote}
                />
              </Group>
            </Box>
          )}

          {compact && post && (
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
            borderColor: theme.colors.gray[3],
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomLeftRadius: theme.radius.md,
          })}
        />
      )}

      {children.length > 0 && (
        <Stack spacing={0}>
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
