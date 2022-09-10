import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import { useCallback } from "react";
import {
  CommentAggregates, CreateCommentLike,
  CreatePostLike,
  GetPost,
  PostAggregates,
} from "ujournal-lemmy-js-client";
import { None, Some } from "@sniptt/monads";
import { queryClient } from "baza/reactQuery";

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
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  /*const handleCommentVoteSuccess = useCallback(async () => {
    if (onSuccess) {
      const {
        post_view: { my_vote: myVote, counts },
      } = await lemmyClient.getPost(
        new GetPost({
          id: Some(commentId),
          comment_id: None,
          auth: auth.token.ok(),
        })
      );

      onSuccess({ counts, myVote: myVote.unwrapOr(0) });

      await queryClient.invalidateQueries(["post"]);
    }
  }, [auth.token, lemmyClient, onSuccess, commentId]);*/

  const likeComment = useMutation(
    ["likePost", commentId],
    async (score: number) =>
      await lemmyClient.likeComment(
        new CreateCommentLike({
          comment_id: commentId,
          score,
          auth: auth.token.unwrap(),
        })
      ),
    { onSuccess: ()=>{} }
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
