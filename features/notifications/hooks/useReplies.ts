import { Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { merge } from "lodash";
import { CommentSortType, GetReplies } from "ujournal-lemmy-js-client";

type RepliesParams = Partial<{
  sort: CommentSortType;
  page: number;
  limit: number;
  unread_only: boolean;
}>;

export const useReplies = (params: RepliesParams = {}) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  const _params = merge(
    {
      sort: Some(CommentSortType.New),
      page: Some(1),
      limit: Some(20),
      unread_only: Some(true),
      auth: auth.token.ok().unwrapOr(""),
    },
    {
      sort: params.sort ? Some(params.sort) : undefined,
      page: params.page ? Some(params.page) : undefined,
      limit: params.limit ? Some(params.limit) : undefined,
      unread_only: params.unread_only ? Some(params.unread_only) : undefined,
    }
  );

  return useQuery(
    ["replies", auth.token.ok().unwrapOr("")],
    async () => await lemmyClient.getReplies(new GetReplies(_params))
  );
};
