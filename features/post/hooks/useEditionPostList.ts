import { sub } from "date-fns";
import { useMemo } from "react";
import { ListingType, SortType } from "ujournal-lemmy-js-client";
import { usePostList } from "./usePostList";

export const useEditionPostList = ({
  communityName,
}: {
  communityName: string;
}) => {
  const postList = usePostList({
    params: {
      type: ListingType.All,
      sort: SortType.TopDay,
      limit: 10,
    },
  });

  const postEditonList = usePostList({
    params: {
      type: ListingType.All,
      sort: SortType.New,
      communityName,
      limit: 20,
    },
  });

  const postListDataFiltered = useMemo(() => {
    const posts = postList.data
      .filter(({ post }) => post.name.split(" ").length > 2)
      .filter(({ community }) => community.name !== communityName);

    const editionPosts =
      postEditonList.data.length > 0
        ? postEditonList.data.filter(
            ({ post }) =>
              sub(new Date(), { days: 2 }) < new Date(post.published)
          )
        : [];

    return [...editionPosts, ...posts];
  }, [communityName, postEditonList.data, postList.data]);

  return {
    data: postListDataFiltered,
    isFetching: postList.isFetching || postEditonList.isFetching,
    isLoading: postList.isLoading || postEditonList.isLoading,
    fetchNextPage: postList.fetchNextPage,
  };
};
