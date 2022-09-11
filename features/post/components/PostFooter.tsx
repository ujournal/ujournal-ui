import { Group, Box, Button, Tooltip, Container } from "@mantine/core";
import { FC, useEffect } from "react";
import { IconMessageCircle2 } from "@tabler/icons";
import { useState } from "react";
import { VoteButtons } from "baza/components/VoteButtons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { formatShortNum } from "baza/utils/number";
import Link from "next/link";
import { usePostVote } from "../hooks/usePostVote";
import { Post, PostAggregates } from "ujournal-lemmy-js-client";
import { Option } from "@sniptt/monads";

export const PostFooter: FC<{
  post: Post;
  counts: PostAggregates;
  myVote: Option<number>;
  commentsAsText?: boolean;
}> = ({ counts, myVote, post, commentsAsText = false }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });

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

  return (
    <Container size={650} p={0}>
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
          {commentsAsText ? (
            <Box sx={{ whiteSpace: "nowrap", fontWeight: 600 }} p="sm">
              {counts.comments === 0
                ? t("comments")
                : counts.comments > 0 && counts.comments < 5
                ? t("number_of_comments", {
                    count: counts.comments,
                    formattedCount: formatShortNum(counts.comments),
                  })
                : t("number_of_comments_plural", {
                    count: counts.comments,
                    formattedCount: formatShortNum(counts.comments),
                  })}
            </Box>
          ) : (
            <Link href={`/post?postId=${post.id}#comments`} passHref>
              <Tooltip
                label={
                  counts.comments > 0 && counts.comments < 5
                    ? t("number_of_comments", {
                        count: counts.comments,
                        formattedCount: counts.comments,
                      })
                    : t("number_of_comments_plural", {
                        count: counts.comments,
                        formattedCount: counts.comments,
                      })
                }
                openDelay={1000}
              >
                <Button
                  component="a"
                  leftIcon={<IconMessageCircle2 stroke={1.5} />}
                  variant="subtle"
                >
                  {counts.comments === 0
                    ? t("comments")
                    : counts.comments > 0 && counts.comments < 5
                    ? t("number_of_comments", {
                        count: counts.comments,
                        formattedCount: formatShortNum(counts.comments),
                      })
                    : t("number_of_comments_plural", {
                        count: counts.comments,
                        formattedCount: formatShortNum(counts.comments),
                      })}
                </Button>
              </Tooltip>
            </Link>
          )}
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
