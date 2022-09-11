import { Box, Button, Card, Group, Stack, Tooltip } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { MarkdownText } from "baza/components/MarkdownText";
import { capitalize } from "baza/utils/string";
import { UserButton } from "features/user/components/UserButton";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateFormatted } from "../../../baza/components/DeteFormatted";
import { VoteButtons } from "../../../baza/components/VoteButtons";
import { useCommentVote } from "../hooks/useCommentVote";
import { CommentInternal } from "../utils/comments";
import { CommentForm, Values as CommentFormValues } from "./CommentForm";

export type CommentProps = CommentInternal & {
  children: CommentInternal[];
  compact?: boolean;
  decoration?: undefined | "middle" | "end";
  truncateLength?: number;
  onCommentSubmit?: (values: CommentFormValues) => void;
};

export const Comment: FC<CommentProps> = ({
  comment,
  creator,
  post,
  children = [],
  compact = false,
  decoration,
  counts,
  my_vote: myVote,
  truncateLength,
  onCommentSubmit,
}) => {
  const { t } = useTranslation();

  const [commentFormShowed, setCommentFormShowed] = useState<boolean>(false);

  const [countsAndMyVote, setCountsAndMyVote] = useState({
    counts,
    myVote,
  });

  const vote = useCommentVote({
    commentId: comment.id,
    onSuccess: setCountsAndMyVote,
  });

  const toggleCommentFormShowed = useCallback(() => {
    setCommentFormShowed((commentFormShowed) => !commentFormShowed);
  }, []);

  const handleCommentSubmit = useCallback(
    async (values: CommentFormValues) => {
      if (onCommentSubmit) {
        await onCommentSubmit({
          parentId: comment.id,
          ...values,
        });

        setCommentFormShowed(false);
      }
    },
    [comment.id, onCommentSubmit]
  );

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote,
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
      <Card
        p={4}
        m={-4}
        sx={(theme) => ({
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.fn.lighten(theme.colors.gray[1], 0.5),
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
            {comment?.published != null ? (
              <DateFormatted date={new Date(comment.published + "Z")} />
            ) : null}
          </Group>

          <Stack spacing={2}>
            <MarkdownText
              text={comment.content}
              withContentMargins={false}
              truncateLength={truncateLength}
            />

            {!compact && (
              <>
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
                    onClick={toggleCommentFormShowed}
                  >
                    {capitalize(t("reply"))}
                  </Button>
                  <VoteButtons
                    counts={countsAndMyVote.counts}
                    myVote={countsAndMyVote.myVote}
                    vote={vote}
                  />
                </Group>
                {commentFormShowed && (
                  <CommentForm onSubmit={handleCommentSubmit} />
                )}
              </>
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
      </Card>

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
              onCommentSubmit,
            })}
            itemKey="comment.id"
          />
        </Stack>
      )}
    </Stack>
  );
};
