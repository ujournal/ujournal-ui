import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { GetPost, GetPostResponse } from "ujournal-lemmy-js-client";

export const usePost = ({ postId }: { postId: number }) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useQuery(
    ["post", { token: auth.token.unwrapOr(""), postId }],
    async () => {
      return (await lemmyClient.getPost(
        new GetPost({
          id: Some(postId),
          comment_id: None,
          auth: auth.token.ok(),
        })
      )) as GetPostResponse & { comments: any[] };
    }
  );
};
