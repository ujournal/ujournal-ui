import { useQuery } from "@tanstack/react-query";
import {
  ListCommunities,
  ListingType,
  SortType,
} from "ujournal-lemmy-js-client";
import { Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";

export const useCommunities = () => {
  const client = useLemmyClient();
  const auth = useAuth();

  return useQuery(["communities"], async () => {
    let type_: Option<ListingType> = Some(ListingType.All);
    let page = Some(1);
    const limit = Some(20);
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
