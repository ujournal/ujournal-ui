import { useQuery } from "@tanstack/react-query";
import {
  ListCommunities,
  ListingType,
  SortType,
} from "ujournal-lemmy-js-client";
import { Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/app/hooks/useAuth";

export const useCommunities = (config: { limit?: number } = {}) => {
  const { limit: _limit = 30 } = config;
  const client = useLemmyClient();
  const auth = useAuth();

  return useQuery(["communities"], async () => {
    let type_: Option<ListingType> = Some(ListingType.All);
    let page = Some(1);
    const limit = Some(_limit);
    const sort = Some(SortType.TopAll);

    return await client.listCommunities(
      new ListCommunities({
        type_,
        sort,
        page,
        limit,
        auth: auth.token.ok(),
      })
    );
  });
};
