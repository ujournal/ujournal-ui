import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { queryClient } from "baza/reactQuery";
import { useAuth } from "features/app/hooks/useAuth";
import { MarkCommentReplyAsRead } from "ujournal-lemmy-js-client";

export const useReplyMarkAsRead = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(["markCommentReplyAsRead"], async (commentId: number) => {
    await lemmyClient.markCommentReplyAsRead(
      new MarkCommentReplyAsRead({
        comment_id: commentId,
        read: true,
        auth: auth.token.ok().unwrap(),
      } as any)
    );

    queryClient.invalidateQueries(["replies"]);
  });
};
