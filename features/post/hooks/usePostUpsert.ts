import { None, Some } from "@sniptt/monads";
import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { queryClient } from "baza/reactQuery";
import { useAuth } from "features/auth/hooks/useAuth";
import { Values as PostEditValues } from "features/post/components/PostForm";
import { CreatePost, EditPost } from "ujournal-lemmy-js-client";

export const usePostUpsert = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(
    ["postUpsert"],
    async (values: PostEditValues & { postId?: number }) => {
      const data = {
        url: Some(values.url),
        body: Some(values.body),
        nsfw: Some(values.nsfw),
        community_id: values.community_id,
        auth: auth.token.unwrap(),
      };

      if (values.postId) {
        queryClient.invalidateQueries(["post"]);

        return await lemmyClient.editPost(
          new EditPost({
            ...data,
            name: Some(values.name),
            post_id: values.postId,
          })
        );
      }

      return await lemmyClient.createPost(
        new CreatePost({
          ...data,
          name: values.name,
          honeypot: None,
        })
      );
    }
  );
};
