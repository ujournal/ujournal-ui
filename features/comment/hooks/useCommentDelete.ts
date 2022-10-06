import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { DeleteComment } from "ujournal-lemmy-js-client";

export const useCommentDelete = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(
    ["commentRemove"],
    async ({
      commentId,
      deleted = true,
    }: {
      commentId: number;
      deleted?: boolean;
    }) => {
      try {
        return await lemmyClient.deleteComment(
          new DeleteComment({
            comment_id: commentId,
            deleted,
            auth: auth.token.unwrap(),
          })
        );
      } catch {}
    }
  );
};
