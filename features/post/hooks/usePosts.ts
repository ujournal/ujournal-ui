import { useQuery } from "@tanstack/react-query";
import { GetPosts, ListingType, SortType } from "ujournal-lemmy-js-client";
import { None, Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "hooks/useLemmyClient";
import { useLemmyAuth } from "hooks/useLemmyAuth";

export const usePosts = () => {
  const client = useLemmyClient();
  const auth = useLemmyAuth();

  return useQuery(["posts"], async () => {
    let type_: Option<ListingType> = Some(ListingType.All);
    let page = Some(1);
    const limit = Some(20);
    const sort = Some(SortType.Hot);

    return await client.getPosts(
      new GetPosts({
        type_,
        sort,
        page,
        limit,
        community_id: None,
        community_name: None,
        saved_only: Some(false),
        auth: auth.token.ok(),
      })
    );
  });
};
