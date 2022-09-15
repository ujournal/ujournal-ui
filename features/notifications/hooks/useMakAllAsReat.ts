import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { queryClient } from "baza/reactQuery";
import { useAuth } from "features/app/hooks/useAuth";
import { MarkAllAsRead } from "ujournal-lemmy-js-client";

export const useMarkAllAsRead = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(["markAllAsRead"], async () => {
    await lemmyClient.markAllAsRead(
      new MarkAllAsRead(auth.token.ok().unwrap())
    );

    queryClient.invalidateQueries(["replies"]);
  });
};
