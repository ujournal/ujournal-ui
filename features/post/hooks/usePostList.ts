import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { GetPosts, ListingType, SortType } from "ujournal-lemmy-js-client";
import { None, Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";
import { merge } from "lodash";

export type FetchPostsParams = {
  sort?: SortType;
  page?: number;
  limit?: number;
  communityId?: number;
  communityName?: string;
};

export const fetchPostsParamsDefault = {
  sort: SortType.Hot,
  page: 1,
  limit: 20,
  communityId: undefined,
  communityName: undefined,
};

const usePostsFetcher = (params: FetchPostsParams = {}) => {
  const client = useLemmyClient();
  const auth = useAuth();

  const { sort, limit, communityId, communityName } = merge(
    fetchPostsParamsDefault,
    params
  );

  let type_: Option<ListingType> = Some(ListingType.All);

  return async ({ pageParam: page = 1 }: QueryFunctionContext) =>
    await client.getPosts(
      new GetPosts({
        type_,
        sort: Some(sort),
        page: Some(page),
        limit: Some(limit),
        community_id: communityId ? Some(communityId) : None,
        community_name: communityName ? Some(communityName) : None,
        saved_only: Some(false),
        auth: auth.token.ok(),
      })
    );
};

export const usePostList = ({ params = {} }: { params: FetchPostsParams }) => {
  const auth = useAuth();
  const fetchPosts = usePostsFetcher(params);

  return useInfiniteQuery(
    ["posts", { token: auth.token.unwrapOr(""), ...params }, fetchPosts],
    fetchPosts,
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );
};
