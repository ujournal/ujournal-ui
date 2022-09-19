import { None, Some } from "@sniptt/monads";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";
import { merge } from "lodash";
import {
  ListingType,
  Search,
  SearchType,
  SortType,
} from "ujournal-lemmy-js-client";

export type SearchProps = {
  q: string;
  type: SearchType;
  community_id: number;
  community_name: string;
  creator_id: number;
  sort: SortType;
  listing_type: ListingType;
  page: number;
  limit: number;
};

export const useSearch = (params: Partial<SearchProps>) => {
  const lemmyClient = useLemmyClient();
  const auth = useAuth();

  const _params = merge(
    {
      q: "",
      type_: SearchType.All,
      community_id: undefined,
      community_name: undefined,
      creator_id: undefined,
      sort: SortType.TopAll,
      listing_type: ListingType.All,
      page: 1,
      limit: 20,
    },
    params
  );

  return useQuery(["search", JSON.stringify(params)], async () => {
    if (!params.q) {
      return undefined;
    }

    return await lemmyClient.search(
      new Search({
        q: _params.q,
        type_: _params.type ? Some(_params.type) : None,
        community_id: _params.community_id ? Some(_params.community_id) : None,
        community_name: _params.community_name
          ? Some(_params.community_name)
          : None,
        creator_id: _params.creator_id ? Some(_params.creator_id) : None,
        listing_type: _params.listing_type ? Some(_params.listing_type) : None,
        sort: _params.sort ? Some(_params.sort) : None,
        page: _params.page ? Some(_params.page) : None,
        limit: _params.limit ? Some(_params.limit) : None,
        auth: auth.token.ok(),
      })
    );
  });
};
