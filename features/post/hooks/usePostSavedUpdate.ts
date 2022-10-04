import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { SavePost } from "ujournal-lemmy-js-client";

export const usePostSavedUpdate = ({ postId }: { postId: number }) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(["postSavedUpdate", postId], async (save: boolean) => {
    return await lemmyClient.savePost(
      new SavePost({
        post_id: postId,
        save,
        auth: auth.token.ok().unwrap(),
      })
    );
  });
};
