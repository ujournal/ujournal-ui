import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPosts, ListingType, SortType } from "ujournal-lemmy-js-client";
import { None, Option, Some } from "@sniptt/monads";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { useAuth } from "features/auth/hooks/useAuth";

const fetchPosts = async (
  client: ReturnType<typeof useLemmyClient>,
  auth: ReturnType<typeof useAuth>,
  params: {
    sort?: SortType;
    page?: number;
    limit?: number;
  } = {}
) => {
  const { sort = SortType.Hot, page = 1, limit = 20 } = params;
  let type_: Option<ListingType> = Some(ListingType.All);
  let _page = Some(page);
  const _limit = Some(limit);
  const _sort = Some(sort);

  return await client.getPosts(
    new GetPosts({
      type_,
      sort: _sort,
      page: _page,
      limit: _limit,
      community_id: None,
      community_name: None,
      saved_only: Some(false),
      auth: auth.token.ok(),
    })
  );
};

export const usePostList = ({
  sort = SortType.Hot,
  page = 1,
  limit = 20,
}: { sort?: SortType; page?: number; limit?: number } = {}) => {
  const client = useLemmyClient();
  const auth = useAuth();

  return useInfiniteQuery(
    ["posts", auth.token.unwrapOr(""), sort, page, limit],
    ({ pageParam: page }) => {
      return fetchPosts(client, auth, { sort, page });
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
};
