import {
  Group,
  Button,
  Tooltip,
  Container,
  Box,
  ActionIcon,
} from "@mantine/core";
import { FC, useCallback, useEffect } from "react";
import {
  IconBookmark,
  IconBookmarkOff,
  IconMessageCircle2,
} from "@tabler/icons";
import { useState } from "react";
import { VoteButtons } from "baza/components/VoteButtons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import Link from "next/link";
import { usePostVote } from "../hooks/usePostVote";
import { Post, PostAggregates } from "ujournal-lemmy-js-client";
import { Option } from "@sniptt/monads";
import { CommentTitle } from "features/comment/components/CommentTitle";
import { usePostSavedUpdate } from "../hooks/usePostSavedUpdate";
import { showNotification } from "@mantine/notifications";
import { queryClient } from "baza/reactQuery";
import { capitalize } from "baza/utils/string";
import { useTranslation } from "react-i18next";

export const PostControls: FC<{
  post: Post;
  counts: PostAggregates;
  myVote: Option<number>;
  commentButtonDisabled?: boolean;
  saved?: boolean;
}> = ({
  counts,
  myVote,
  post,
  commentButtonDisabled = false,
  saved = false,
}) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const postSaveUpdate = usePostSavedUpdate({ postId: post.id });
  const { t } = useTranslation();

  const [countsAndMyVote, setCountsAndMyVote] = useState({
    counts,
    myVote: myVote.unwrapOr(0),
  });

  const vote = usePostVote({
    postId: post.id,
    onSuccess: setCountsAndMyVote,
  });

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote: myVote.unwrapOr(0),
    });
  }, [counts, myVote]);

  const handlePostSave = useCallback(async () => {
    await postSaveUpdate.mutateAsync(!saved);
    queryClient.invalidateQueries(["post"]);
    queryClient.invalidateQueries(["posts"]);
    queryClient.invalidateQueries(["personDetails"]);
    showNotification({ message: "OK!" });
  }, [postSaveUpdate, saved]);

  return (
    <Container size={650} p={0} sx={{ width: "100%" }}>
      <Group
        position="apart"
        mt="xs"
        ml="-xs"
        mb={largerThanMd ? "-xs" : undefined}
      >
        <Group
          noWrap
          sx={{ flex: "1 1 0", flexGrow: "unset" }}
          spacing="xs"
          align="center"
        >
          <Tooltip label={<CommentTitle counts={counts} showFull />}>
            <Box component="span">
              <Link href={`/post?postId=${post.id}#comments`} passHref>
                <Button
                  component="a"
                  leftIcon={<IconMessageCircle2 stroke={1.5} />}
                  variant="subtle"
                  disabled={commentButtonDisabled}
                  color="gray"
                  sx={(theme) => ({
                    "&[data-disabled]": {
                      color: theme.fn.rgba(
                        theme.colorScheme === "light"
                          ? theme.black
                          : theme.white,
                        0.25
                      ),
                    },

                    backgroundColor: commentButtonDisabled
                      ? "transparent !important"
                      : undefined,
                  })}
                >
                  <CommentTitle counts={counts} />
                </Button>
              </Link>
            </Box>
          </Tooltip>
          <Tooltip label={capitalize(t(saved ? "unsave" : "save"))}>
            <ActionIcon onClick={handlePostSave}>
              {saved ? (
                <IconBookmarkOff stroke={1.5} />
              ) : (
                <IconBookmark stroke={1.5} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>

        <VoteButtons
          counts={countsAndMyVote.counts}
          myVote={countsAndMyVote.myVote}
          vote={vote}
        />
      </Group>
    </Container>
  );
};
