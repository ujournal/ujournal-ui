import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPosts, ListingType, SortType } from "ujournal-lemmy-js-client";
import { None, Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";

const fetchPosts = async (
  client: ReturnType<typeof useLemmyClient>,
  auth: ReturnType<typeof useAuth>,
  page: number = 1
) => {
  let type_: Option<ListingType> = Some(ListingType.All);
  let _page = Some(page);
  const limit = Some(20);
  const sort = Some(SortType.Hot);

  return await client.getPosts(
    new GetPosts({
      type_,
      sort,
      page: _page,
      limit,
      community_id: None,
      community_name: None,
      saved_only: Some(false),
      auth: auth.token.ok(),
    })
  );
};

export const usePostList = () => {
  const client = useLemmyClient();
  const auth = useAuth();

  return useInfiniteQuery(
    ["posts"],
    ({ pageParam: page }) => {
      return fetchPosts(client, auth, page);
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
};
