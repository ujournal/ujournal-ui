import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import {
  CommentSortType,
  GetComments,
  ListingType,
} from "ujournal-lemmy-js-client";

export const useCommentList = ({
  sort = CommentSortType.Hot,
  maxDepth = 8,
  parentId,
  postId,
}: {
  postId: number;
  sort: CommentSortType;
  maxDepth: number;
  parentId: number;
}) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  return useQuery(["commentList", postId], async () => {
    return await lemmyClient.getComments(
      new GetComments({
        post_id: Some(postId),
        parent_id: Some(parentId),
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
