import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { useCallback } from "react";
import {
  CreatePostLike,
  GetPost,
  PostAggregates,
} from "ujournal-lemmy-js-client";
import { None, Some } from "@sniptt/monads";
import { queryClient } from "baza/reactQuery";
import { useRouter } from "next/router";

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
  const router = useRouter();
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

      onSuccess({ counts, myVote: myVote.unwrapOr(0) });

      await queryClient.invalidateQueries(["post"]);
    }
  }, [auth.token, lemmyClient, onSuccess, postId]);

  const likePost = useMutation(
    ["likePost", postId],
    async (score: number) => {
      if (!auth.token.unwrapOr("")) {
        router.push({ pathname: "/sign-in" });
        return Promise.reject();
      }

      return await lemmyClient.likePost(
        new CreatePostLike({
          post_id: postId,
          score,
          auth: auth.token.unwrap(),
        })
      );
    },
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

  const voteZero = useCallback(
    async () => await likePost.mutateAsync(0),
    [likePost]
  );

  return {
    isLoading: likePost.isLoading,
    voteUp,
    voteDown,
    voteZero,
  };
};
