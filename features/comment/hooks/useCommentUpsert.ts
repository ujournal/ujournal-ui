import { None, Some } from "@sniptt/monads";
import { useMutation } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { Values as CommentEditValues } from "features/comment/forms/CommentForm";
import { CreateComment, EditComment } from "ujournal-lemmy-js-client";
import { encodeCommentContent } from "../utils/comments";

export const useCommentUpsert = () => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useMutation(
    ["commentUpsert"],
    async (
      values: CommentEditValues & {
        postId?: number;
        commentId?: number;
        parentId?: number;
      }
    ) => {
      if (values.commentId) {
        let result = null;

        // done through try/catch because Lemmy back-end returns 400 error at the moment
        try {
          result = await lemmyClient.editComment(
            new EditComment({
              comment_id: values.commentId,
              content: Some(encodeCommentContent(values.content)),
              distinguished: None,
              form_id: None,
              auth: auth.token.unwrap(),
            })
          );
        } catch {}

        return result;
      }

      if (!values.postId) {
        throw new Error("Value of postId is required.");
      }

      let result = null;

      // done through try/catch because Lemmy back-end returns 400 error at the moment
      try {
        result = await lemmyClient.createComment(
          new CreateComment({
            content: encodeCommentContent(values.content),
            parent_id: values.parentId ? Some(values.parentId) : None,
            post_id: values.postId,
            form_id: None,
            auth: auth.token.unwrap(),
          })
        );
      } catch (error) {}

      return result;
    }
  );
};
