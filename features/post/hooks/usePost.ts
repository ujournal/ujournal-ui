import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import { GetPost } from "ujournal-lemmy-js-client";

export const usePost = ({ postId }: { postId: number }) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useQuery(["post", postId], async () => {
    return await lemmyClient.getPost(
      new GetPost({
        id: Some(postId),
        comment_id: None,
        auth: auth.token.ok(),
      })
    );
  });
};
