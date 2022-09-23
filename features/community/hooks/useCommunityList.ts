import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import {
  CommunityResponse,
  ListCommunities,
  ListingType,
  SortType,
} from "ujournal-lemmy-js-client";
import { Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { flattenDepth, get, map, merge } from "lodash";
import { useMemo } from "react";

export type FetchCommunitiesParams = {
  type?: ListingType;
  sort?: SortType;
  page?: number;
  limit?: number;
  communityId?: number;
  communityName?: string;
};

export const fetchCommunitiesParamsDefault = {
  type: ListingType.All,
  sort: SortType.TopAll,
  page: 1,
  limit: 1000,
};

const useCommunitiesFetcher = (params: FetchCommunitiesParams = {}) => {
  const client = useLemmyClient();
  const auth = useAuth();

  const { type, sort, limit } = merge(fetchCommunitiesParamsDefault, params);

  return async ({ pageParam: page = 1 }: QueryFunctionContext) =>
    await client.listCommunities(
      new ListCommunities({
        type_: Some(type),
        sort: Some(sort),
        page: Some(page),
        limit: Some(limit),
        auth: auth.token.ok(),
      })
    );
};

export const useCommunityList = (params: FetchCommunitiesParams = {}) => {
  const auth = useAuth();
  const fetchCommunities = useCommunitiesFetcher(params);

  const { data, ...query } = useInfiniteQuery(
    [
      "communities",
      JSON.stringify({ token: auth.token.unwrapOr(""), ...params }),
      fetchCommunities,
    ],
    fetchCommunities,
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );

  CommunityResponse;

  return {
    ...query,
    data: useMemo(
      () =>
        flattenDepth(
          map(data?.pages, (item) => get(item, "communities")),
          1
        ) || [],
      [data]
    ),
  };
};
