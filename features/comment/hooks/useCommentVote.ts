import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  CommentAggregates,
  CommentResponse,
  CreateCommentLike,
} from "ujournal-lemmy-js-client";

export const useCommentVote = ({
  commentId,
  onSuccess,
}: {
  commentId: number;
  onSuccess?: (countsAndMyVote: {
    counts: CommentAggregates;
    myVote: number;
  }) => void;
}) => {
  const router = useRouter();
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  const handleCommentVoteSuccess = useCallback(
    async (r: CommentResponse) => {
      if (onSuccess) {
        onSuccess({
          counts: r.comment_view.counts,
          myVote: r.comment_view.my_vote.unwrapOr(0),
        });
      }
    },
    [onSuccess]
  );

  const likeComment = useMutation(
    ["likeComment", commentId],
    async (score: number) => {
      if (!auth.token.unwrapOr("")) {
        router.push({ pathname: "/sign-in" });
        return Promise.reject();
      }

      return await lemmyClient.likeComment(
        new CreateCommentLike({
          comment_id: commentId,
          score,
          auth: auth.token.unwrap(),
        })
      );
    },
    { onSuccess: handleCommentVoteSuccess }
  );

  const voteUp = useCallback(
    async () => await likeComment.mutateAsync(1),
    [likeComment]
  );

  const voteDown = useCallback(
    async () => await likeComment.mutateAsync(-1),
    [likeComment]
  );

  const voteZero = useCallback(
    async () => await likeComment.mutateAsync(0),
    [likeComment]
  );

  return {
    isLoading: likeComment.isLoading,
    voteUp,
    voteDown,
    voteZero,
  };
};
