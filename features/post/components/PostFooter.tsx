import { Group, Box, Button, Tooltip, Container } from "@mantine/core";
import { FC, useEffect } from "react";
import { IconMessageCircle2 } from "@tabler/icons";
import { useState } from "react";
import { VoteButtons } from "baza/components/VoteButtons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePostVote } from "../hooks/usePostVote";
import {PersonSafe, Post, PostAggregates} from "ujournal-lemmy-js-client";
import { Option } from "@sniptt/monads";
import { CommentTitle } from "features/comment/components/CommentTitle";
import {userPersonViewSafe} from "../../user/hooks/userPersonViewSafe";
import {UserButton} from "../../user/components/UserButton";

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
    creatorId: post.creator_id,
    postId: post.id,
    onSuccess: setCountsAndMyVote,
  });

  useEffect(() => {
    setCountsAndMyVote({
      counts,
      myVote: myVote.unwrapOr(0),
    });
  }, [counts, myVote]);
  
  let personViewSafe = null;
  let creator : PersonSafe = new PersonSafe();
  if(commentsAsText) {
    personViewSafe = userPersonViewSafe({
      creatorId: post.creator_id
    })
    creator = personViewSafe.data?.person ?? new PersonSafe();
  }

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
              <CommentTitle counts={counts} />
            </Box>
          ) : (
            <Link href={`/post?postId=${post.id}#comments`} passHref>
              <Tooltip
                label={<CommentTitle counts={counts} showFull />}
                openDelay={1000}
              >
                <Button
                  component="a"
                  leftIcon={<IconMessageCircle2 stroke={1.5} />}
                  variant="subtle"
                >
                  <CommentTitle counts={counts} />
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
      <Group>
        {commentsAsText 
            ?
            (<Group>
              <UserButton
                  userId={creator.id}
                  image={creator.avatar?.match<string | undefined>({
                    some: (name) => name,
                    none: undefined,
                  })}
                  label={creator.display_name?.match<string>({
                    some: (name) => name,
                    none: () => creator.name,
                  })}
              />
              <span>рейтинг: {personViewSafe?.data?.totalScore}</span>
            </Group>)
            : null
        }
      </Group>
    </Container>
  );
};
