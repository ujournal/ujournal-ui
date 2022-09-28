import { Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { buildKeyFromParams } from "baza/utils/key";
import { useAuth } from "features/app/hooks/useAuth";
import { merge } from "lodash";
import { CommentSortType, GetPersonMentions } from "ujournal-lemmy-js-client";

type MentionsParams = Partial<{
  sort: CommentSortType;
  page: number;
  limit: number;
  unread_only: boolean;
}>;

export const useMentions = (params: MentionsParams = {}) => {
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
    ["mentions", buildKeyFromParams(params), auth.token.ok().unwrapOr("")],
    async () => {
      if (!auth.token.ok().unwrapOr("")) {
        return undefined;
      }

      return await lemmyClient.getPersonMentions(
        new GetPersonMentions({
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
