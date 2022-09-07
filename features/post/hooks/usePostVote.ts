import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import { useCallback } from "react";
import {
  CreatePostLike,
  GetPost,
  PostAggregates,
} from "ujournal-lemmy-js-client";
import { None, Some } from "@sniptt/monads";

export const usePostVote = ({
  postId,
  onSuccess,
}: {
  postId: number;
  onSuccess?: (countsAndMyVote: {
    counts: PostAggregates;
    myVote: number;
  }) => void;
}) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  const handlePostVoteSuccess = useCallback(async () => {
    if (onSuccess) {
      const {
        post_view: { my_vote: myVote, counts },
      } = await lemmyClient.getPost(
        new GetPost({
          id: Some(postId),
          comment_id: None,
          auth: auth.token.ok(),
        })
      );

      onSuccess({ counts, myVote: myVote.unwrap() });
    }
  }, [auth.token, lemmyClient, onSuccess, postId]);

  const likePost = useMutation(
    ["like"],
    async (score: number) =>
      await lemmyClient.likePost(
        new CreatePostLike({
          post_id: postId,
          score,
          auth: auth.token.unwrap(),
        })
      ),
    { onSuccess: handlePostVoteSuccess }
  );

  const voteUp = useCallback(
    async () => await likePost.mutateAsync(1),
    [likePost]
  );

  const voteDown = useCallback(
    async () => await likePost.mutateAsync(-1),
    [likePost]
  );

  return {
    isLoading: likePost.isLoading,
    voteUp,
    voteDown,
  };
};
