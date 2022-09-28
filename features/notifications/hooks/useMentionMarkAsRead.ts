import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { queryClient } from "baza/reactQuery";
import { useAuth } from "features/app/hooks/useAuth";
import { MarkPersonMentionAsRead } from "ujournal-lemmy-js-client";

export const useMentionMarkAsRead = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(
    ["markPersonMentionAsRead"],
    async (personMentionId: number) => {
      await lemmyClient.markPersonMentionAsRead(
        new MarkPersonMentionAsRead({
          person_mention_id: personMentionId,
          read: true,
          auth: auth.token.ok().unwrap(),
        } as any)
      );

      queryClient.invalidateQueries(["mentions"]);
    }
  );
};
