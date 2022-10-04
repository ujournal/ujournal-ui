import { Box, Button, Card, Group, Stack, Tooltip } from "@mantine/core";
import { DataList } from "baza/components/DataList";
import { MarkdownText } from "baza/components/MarkdownText";
import { capitalize } from "baza/utils/string";
import { UserButton } from "features/user/components/UserButton";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateFormatted } from "baza/components/DeteFormatted";
import { VoteButtons } from "baza/components/VoteButtons";
import { useCommentVote } from "../hooks/useCommentVote";
import {
  CommentInternal,
  decodeCommentContentForRender,
} from "../utils/comments";
import { CommentForm, Values as CommentFormValues } from "../forms/CommentForm";
import { CommentMenu } from "./CommentMenu";
import { useCommentUpsert } from "../hooks/useCommentUpsert";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

export type CommentProps = CommentInternal & {
  children: CommentInternal[];
  compact?: boolean;
  decoration?: undefined | "middle" | "end";
  truncateLength?: number;
  postId?: number;
  asLink?: boolean;
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
  postId,
  asLink = false,
}) => {
  const routerQuery = useRouterQuery<{ commentId: string | undefined }>({
    commentId: undefined,
  });
  const { t } = useTranslation();
  const clipboard = useClipboard({ timeout: 500 });

  const [commentAdding, setCommentAdding] = useState<boolean>(false);
  const [commentEditing, setCommentEditing] = useState<boolean>(false);

  const [countsAndMyVote, setCountsAndMyVote] = useState({
    counts,
    myVote,
  });

  const commentUpsert = useCommentUpsert();

  const vote = useCommentVote({
    commentId: comment.id,
    onSuccess: setCountsAndMyVote,
  });

  const toggleCommentFormShowed = useCallback(() => {
    setCommentAdding((commentFormShowed) => !commentFormShowed);
  }, []);

  const handleCommentAddSubmit = useCallback(
    async (values: CommentFormValues) => {
      await commentUpsert.mutateAsync({
        parentId: comment.id,
        postId,
        ...values,
      });

      setCommentAdding(false);
    },
    [comment.id, commentUpsert, postId]
  );

  const handleCommentEditSubmit = useCallback(
    async (values: CommentFormValues) => {
      await commentUpsert.mutateAsync({
        commentId: comment.id,
        ...values,
      });

      setCommentEditing(false);
    },
    [comment.id, commentUpsert]
  );

  const handleCommentEdit = useCallback(() => {
    setCommentEditing((editing) => !editing);
  }, []);

  const handleCopyLink = useCallback(() => {
    clipboard.copy(
      `${location.protocol}//${location.host}/${process.env.NEXT_PUBLIC_BASE_URL}post/?postId=3114&commentId=${comment.id}`
    );
    showNotification({
      message: "Copied!",
    });
  }, [clipboard, comment.id]);

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote,
    });
  }, [counts, myVote]);

  useEffect(() => {
    if (String(comment.id) === routerQuery.commentId) {
      window.document.getElementById(`comment-${comment.id}`)?.scrollIntoView();
    }
  }, [comment.id, routerQuery.commentId]);

  const commentContent = (
    <MarkdownText
      text={decodeCommentContentForRender(comment.content)}
      truncateLength={truncateLength}
      compact
    />
  );

  const commentContentWithOrWithoutLink = asLink ? (
    <Link
      href={{
        pathname: "/post",
        query: { postId: post.id, commentId: comment.id },
      }}
      passHref
    >
      <Box component="a">{commentContent}</Box>
    </Link>
  ) : (
    commentContent
  );

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
      id={`comment-${comment.id}`}
    >
      <Card
        p={2}
        mx={-2}
        sx={(theme) => ({
          overflow: commentEditing || commentAdding ? "visible" : "hidden",
          backgroundColor:
            String(comment.id) === routerQuery.commentId
              ? theme.fn.lighten(theme.colors.yellow[1], 0.25)
              : "transparent",
          "&:hover": {
            backgroundColor: theme.fn.lighten(theme.colors.gray[1], 0.5),
          },
        })}
      >
        <Stack spacing={0}>
          <Group spacing={0}>
            <UserButton
              userId={creator.id}
              username={creator.name}
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
            {commentEditing ? (
              <CommentForm
                autofocus
                values={comment}
                isLoading={commentUpsert.isLoading}
                onSubmit={handleCommentEditSubmit}
              />
            ) : (
              commentContentWithOrWithoutLink
            )}

            {!compact && (
              <>
                <Group position="apart">
                  <Group spacing="xs">
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
                    <CommentMenu
                      onEdit={handleCommentEdit}
                      onCopyLink={handleCopyLink}
                    />
                  </Group>
                  <VoteButtons
                    counts={countsAndMyVote.counts}
                    myVote={countsAndMyVote.myVote}
                    vote={vote}
                  />
                </Group>
                {commentAdding && (
                  <CommentForm
                    autofocus
                    isLoading={commentUpsert.isLoading}
                    onSubmit={handleCommentAddSubmit}
                  />
                )}
              </>
            )}

            {compact && post && (
              <Tooltip
                label={post.name}
                sx={{ whiteSpace: "normal", maxWidth: 200 }}
                withinPortal
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
              postId,
            })}
            itemKey="comment.id"
          />
        </Stack>
      )}
    </Stack>
  );
};
