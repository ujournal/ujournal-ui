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
      sort: CommentSortType.New,
      page: 1,
      limit: 20,
      unread_only: true,
    },
    params
  );

  return useQuery(
    ["replies", JSON.stringify(params), auth.token.ok().unwrapOr("")],
    async () => {
      if (!auth.token.ok().unwrapOr("")) {
        return undefined;
      }

      return await lemmyClient.getReplies(
        new GetReplies({
          sort: Some(_params.sort),
          page: Some(_params.page),
          limit: Some(_params.limit),
          unread_only: Some(_params.unread_only),
          auth: auth.token.ok().unwrapOr(""),
        })
      );
    },
    { refetchInterval: 30000 }
  );
};
