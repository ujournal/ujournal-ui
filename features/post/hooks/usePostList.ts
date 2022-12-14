import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { GetPosts, ListingType, SortType } from "ujournal-lemmy-js-client";
import { None, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { flattenDepth, get, map, merge } from "lodash";
import { buildKeyFromParams } from "baza/utils/key";
import { useMemo } from "react";
import { removePostDuplicates } from "../utils/postDuplicates";

export type FetchPostsParams = {
  type?: ListingType;
  sort?: SortType;
  page?: number;
  limit?: number;
  communityId?: number;
  communityName?: string;
};

export type PostListOptions = {
  removeDuplicates: boolean;
};

export const fetchPostsParamsDefault = {
  type: ListingType.All,
  sort: SortType.Hot,
  page: 1,
  limit: 20,
  communityId: undefined,
  communityName: undefined,
};

const usePostsFetcher = (params: FetchPostsParams = {}) => {
  const client = useLemmyClient();
  const auth = useAuth();

  const { type, sort, limit, communityId, communityName } = merge(
    {
      type: ListingType.Subscribed,
      sort: SortType.Hot,
      page: 1,
      limit: 20,
      communityId: undefined,
      communityName: undefined,
    },
    params
  );

  return async ({ pageParam: page = 1 }: QueryFunctionContext) =>
    await client.getPosts(
      new GetPosts({
        type_: Some(type),
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

export const usePostList = (
  { params = {} }: { params: FetchPostsParams },
  { removeDuplicates }: PostListOptions = { removeDuplicates: true }
) => {
  const auth = useAuth();
  const fetchPosts = usePostsFetcher(params);

  const postList = useInfiniteQuery(
    [
      "posts",
      buildKeyFromParams({ token: auth.token.unwrapOr(""), ...params }),
      fetchPosts,
    ],
    fetchPosts,
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );

  return useMemo(() => {
    const data =
      flattenDepth(
        map(postList.data?.pages, (item) => get(item, "posts")),
        1
      ) || [];

    return {
      ...postList,
      data: removeDuplicates ? removePostDuplicates(data) : data,
    };
  }, [postList, removeDuplicates]);
};
