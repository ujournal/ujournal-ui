import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import {
  CommentSortType,
  GetComments,
  ListingType,
} from "ujournal-lemmy-js-client";

export const useCommentList = (
  params: {
    postId?: number;
    parentId?: number;
    sort?: CommentSortType;
    maxDepth?: number;
  } = {}
) => {
  const { sort = CommentSortType.Hot, maxDepth = 8, parentId, postId } = params;
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useQuery(["commentList", parentId, postId], async () => {
    return await lemmyClient.getComments(
      new GetComments({
        post_id: postId ? Some(postId) : None,
        parent_id: parentId ? Some(parentId) : None,
        max_depth: Some(maxDepth),
        page: None,
        limit: None,
        sort: Some(sort),
        type_: Some(ListingType.All),
        community_name: None,
        community_id: None,
        saved_only: Some(false),
        auth: auth.token.ok(),
      })
    );
  });
};
